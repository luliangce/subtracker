from typing import Optional
from pydantic import Field
import pydantic


class DBConfig(pydantic.BaseSettings):

    backend = Field("sqlite3", env="DB_BACKEND")
    db_name: str = Field("subtracker", env="DB_NAME")
    db_host: Optional[str] = Field(None, env="DB_HOST")
    db_port: Optional[int] = Field(None, env="DB_PORT")
    db_username: Optional[str] = Field(None, env="DB_USERNAME")
    db_password: Optional[str] = Field(None, env="DB_PWD")


db_config = DBConfig()