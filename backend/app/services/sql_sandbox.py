import sqlite3
from typing import List, Any, Dict, Optional
import re

class SqlSandbox:
    def __init__(self):
        pass

    def _is_safe_select(self, query: str) -> bool:
        """
        Rudimentary check to ensure only SELECT statements are executed.
        In a real production environment, we'd use a parser or restricted DB user.
        """
        clean_query = query.strip().lower()
        # Remove comments
        clean_query = re.sub(r'--.*', '', clean_query)
        clean_query = re.sub(r'/\*.*?\*/', '', clean_query, flags=re.DOTALL)
        clean_query = clean_query.strip()
        
        # Must start with SELECT
        if not clean_query.startswith("select"):
            return False
            
        # Basic blacklist for mutative keywords (not fool-proof but good for intent)
        blacklist = ["insert", "update", "delete", "drop", "alter", "create", "grant", "revoke", "truncate"]
        for word in blacklist:
            # Check for word boundary
            if re.search(r'\b' + word + r'\b', clean_query):
                return False
                
        return True

    def run_query(self, setup_scripts: List[str], query: str) -> Dict[str, Any]:
        """
        Runs the setup scripts and then the user query in an in-memory SQLite DB.
        Returns: {success: bool, data: List[row], error: str}
        """
        if not self._is_safe_select(query):
            return {"success": False, "error": "Security Alert: Only SELECT statements are allowed."}

        try:
            # In-memory DB
            conn = sqlite3.connect(":memory:")
            cursor = conn.cursor()
            
            # Run setup
            for script in setup_scripts:
                cursor.execute(script)
            
            # Run user query
            cursor.execute(query)
            rows = cursor.fetchall()
            
            # Get headers
            columns = [description[0] for description in cursor.description] if cursor.description else []
            
            results = [dict(zip(columns, row)) for row in rows]
            
            conn.close()
            return {"success": True, "data": results}
            
        except sqlite3.Error as e:
            return {"success": False, "error": str(e)}
        except Exception as e:
            return {"success": False, "error": f"Execution error: {str(e)}"}

    def validate_challenge(self, setup_scripts: List[str], solution_query: str, user_query: str) -> bool:
        """
        Compares results of user query vs solution query.
        """
        # Run solution (trusted, so we skip _is_safe_select check or assume it's safe)
        # Actually strictly speaking we should just run it.
        
        # Get expected
        expected_result = self.run_query(setup_scripts, solution_query) # This might fail safety check if solution has non-select? No, solution is select.
        # But wait, run_query checks safety. Solution should be safe.
        # However, to be cleaner, we might need a trusted execute method.
        # For now, assume solution is SELECT.
        
        if not expected_result["success"]:
            # Logic error in problem definition if solution fails
            print(f"Solution failed: {expected_result['error']}")
            return False
            
        # Get actual
        user_result = self.run_query(setup_scripts, user_query)
        
        if not user_result["success"]:
            return False # User query failed SQL error or safety
            
        # Compare
        return user_result["data"] == expected_result["data"]

sandbox = SqlSandbox()
