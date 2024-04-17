# This file is generated by the BAML compiler.
# Do not edit this file directly.
# Instead, edit the BAML files and recompile.

# ruff: noqa: E501,F401
# flake8: noqa: E501,F401
# pylint: disable=unused-import,line-too-long
# fmt: off

from ..types.classes.cls_event import Event
from ..types.classes.cls_raysdata import RaysData
from ..types.classes.cls_resume import Resume
from ..types.enums.enm_datatype import DataType
from ..types.partial.classes.cls_event import PartialEvent
from ..types.partial.classes.cls_raysdata import PartialRaysData
from ..types.partial.classes.cls_resume import PartialResume
from baml_core.stream import AsyncStream
from baml_lib._impl.functions import BaseBAMLFunction
from typing import AsyncIterator, Callable, Protocol, runtime_checkable


IGetDataTypeOutput = RaysData

@runtime_checkable
class IGetDataType(Protocol):
    """
    This is the interface for a function.

    Args:
        text: str

    Returns:
        RaysData
    """

    async def __call__(self, *, text: str) -> RaysData:
        ...

   

@runtime_checkable
class IGetDataTypeStream(Protocol):
    """
    This is the interface for a stream function.

    Args:
        text: str

    Returns:
        AsyncStream[RaysData, PartialRaysData]
    """

    def __call__(self, *, text: str
) -> AsyncStream[RaysData, PartialRaysData]:
        ...
class IBAMLGetDataType(BaseBAMLFunction[RaysData, PartialRaysData]):
    def __init__(self) -> None:
        super().__init__(
            "GetDataType",
            IGetDataType,
            ["default_config"],
        )

    async def __call__(self, *args, **kwargs) -> RaysData:
        return await self.get_impl("").run(*args, **kwargs)
    
    def stream(self, *args, **kwargs) -> AsyncStream[RaysData, PartialRaysData]:
        res = self.get_impl("").stream(*args, **kwargs)
        return res

BAMLGetDataType = IBAMLGetDataType()

__all__ = [ "BAMLGetDataType" ]
