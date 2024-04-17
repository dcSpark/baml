# This file is generated by the BAML compiler.
# Do not edit this file directly.
# Instead, edit the BAML files and recompile.

# ruff: noqa: E501,F401
# flake8: noqa: E501,F401
# pylint: disable=unused-import,line-too-long
# fmt: off

from ..types.enums.enm_category import Category
from baml_core.stream import AsyncStream
from baml_lib._impl.functions import BaseBAMLFunction
from typing import AsyncIterator, Callable, Protocol, runtime_checkable


IClassifyMessage3Output = Category

@runtime_checkable
class IClassifyMessage3(Protocol):
    """
    This is the interface for a function.

    Args:
        input: str

    Returns:
        Category
    """

    async def __call__(self, *, input: str) -> Category:
        ...

   

@runtime_checkable
class IClassifyMessage3Stream(Protocol):
    """
    This is the interface for a stream function.

    Args:
        input: str

    Returns:
        AsyncStream[Category, Category]
    """

    def __call__(self, *, input: str
) -> AsyncStream[Category, Category]:
        ...
class IBAMLClassifyMessage3(BaseBAMLFunction[Category, Category]):
    def __init__(self) -> None:
        super().__init__(
            "ClassifyMessage3",
            IClassifyMessage3,
            ["default_config"],
        )

    async def __call__(self, *args, **kwargs) -> Category:
        return await self.get_impl("").run(*args, **kwargs)
    
    def stream(self, *args, **kwargs) -> AsyncStream[Category, Category]:
        res = self.get_impl("").stream(*args, **kwargs)
        return res

BAMLClassifyMessage3 = IBAMLClassifyMessage3()

__all__ = [ "BAMLClassifyMessage3" ]
