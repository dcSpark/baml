# This file is generated by the BAML compiler.
# Do not edit this file directly.
# Instead, edit the BAML files and recompile.
#
# BAML version: 0.1.1-canary.7
# Generated Date: __DATE__
# Generated by: __USER__

# ruff: noqa: E501,F401
# flake8: noqa: E501,F401
# pylint: disable=unused-import,line-too-long
# fmt: off

from ..types.classes.cls_conversation import Conversation
from ..types.classes.cls_improvedresponse import ImprovedResponse
from ..types.classes.cls_message import Message
from ..types.classes.cls_proposedmessage import ProposedMessage
from ..types.enums.enm_sentiment import Sentiment
from baml_lib._impl.functions import BaseBAMLFunction
from typing import Protocol, runtime_checkable


IMaybePolishTextOutput = ImprovedResponse

@runtime_checkable
class IMaybePolishText(Protocol):
    """
    This is the interface for a function.

    Args:
        arg: ProposedMessage

    Returns:
        ImprovedResponse
    """

    async def __call__(self, arg: ProposedMessage, /) -> ImprovedResponse:
        ...


class IBAMLMaybePolishText(BaseBAMLFunction[ImprovedResponse]):
    def __init__(self) -> None:
        super().__init__(
            "MaybePolishText",
            IMaybePolishText,
            ["v1"],
        )

BAMLMaybePolishText = IBAMLMaybePolishText()

__all__ = [ "BAMLMaybePolishText" ]
