# This file is generated by the BAML compiler.
# Do not edit this file directly.
# Instead, edit the BAML files and recompile.

# ruff: noqa: E501,F401
# flake8: noqa: E501,F401
# pylint: disable=unused-import,line-too-long
# fmt: off

from baml_lib._impl.deserializer import register_deserializer
from enum import Enum


@register_deserializer({

})
class Sentiment(str, Enum):
    Positive = "Positive"
    Negative = "Negative"
    Neutral = "Neutral"
