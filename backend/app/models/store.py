from beanie import Document
from pydantic import Field

class StoreItem(Document):
    item_id: str # e.g. "sql_access_pass"
    name: str
    description: str
    cost: int
    effect: str # Description of effect logic key, e.g. "unlock_phase_3"
    
    class Settings:
        name = "store_items"
