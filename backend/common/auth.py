from typing import Any, Optional

from django.contrib.auth import authenticate, login
from django.http import HttpRequest
from ninja.security.http import HttpBasicAuth


class Auth(HttpBasicAuth):

    def authenticate(self, request: HttpRequest, username: str,
                     password: str) -> Optional[Any]:

        user = authenticate(request, username=username, password=password)
        if user:
            login(request, user)
            return user
