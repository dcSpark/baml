###############################################################################
#
#  Welcome to Baml! To use this generated code, please run the following:
#
#  $ pip install baml
#
###############################################################################

# This file was generated by BAML: please do not edit it. Instead, edit the
# BAML files and re-generate this code.
#
# ruff: noqa: E501,F401
# flake8: noqa: E501,F401
# pylint: disable=unused-import,line-too-long
# fmt: off
from typing import Any, Dict, List, Optional, TypeVar, Union, TypedDict, Type
from typing_extensions import NotRequired
import pprint

import baml_py
from pydantic import BaseModel, ValidationError, create_model

from . import partial_types, types
from .type_builder import TypeBuilder
from .globals import DO_NOT_USE_DIRECTLY_UNLESS_YOU_KNOW_WHAT_YOURE_DOING_CTX, DO_NOT_USE_DIRECTLY_UNLESS_YOU_KNOW_WHAT_YOURE_DOING_RUNTIME


OutputType = TypeVar('OutputType')

def coerce(cls: Type[BaseModel], parsed: Any) -> Any:
  try:
    return cls.model_validate({"inner": parsed}).inner # type: ignore
  except ValidationError as e:
    raise TypeError(
      "Internal BAML error while casting output to {}\n{}".format(
        cls.__name__,
        pprint.pformat(parsed)
      )
    ) from e

# Define the TypedDict with optional parameters having default values
class BamlCallOptions(TypedDict, total=False):
    tb: NotRequired[TypeBuilder]
    client_registry: NotRequired[baml_py.baml_py.ClientRegistry]

class BamlAsyncClient:
    __runtime: baml_py.BamlRuntime
    __ctx_manager: baml_py.BamlCtxManager
    __stream_client: "BamlStreamClient"

    def __init__(self, runtime: baml_py.BamlRuntime, ctx_manager: baml_py.BamlCtxManager):
      self.__runtime = runtime
      self.__ctx_manager = ctx_manager
      self.__stream_client = BamlStreamClient(self.__runtime, self.__ctx_manager)

    @property
    def stream(self):
      return self.__stream_client


    
    async def FnTestAliasedEnumOutput(
        self,
        input: str,
        baml_options: BamlCallOptions = {},
    ) -> types.TestEnum:
      __tb__ = baml_options.get("tb", None)
      if __tb__ is not None:
        tb = __tb__._tb
      else:
        tb = None
      __cr__ = baml_options.get("client_registry", None)

      raw = await self.__runtime.call_function(
        "FnTestAliasedEnumOutput",
        {
          "input": input,
        },
        self.__ctx_manager.get(),
        tb,
        __cr__,
      )
      mdl = create_model("FnTestAliasedEnumOutputReturnType", inner=(types.TestEnum, ...))
      return coerce(mdl, raw.parsed())
    
    async def FnTestClassAlias(
        self,
        input: str,
        baml_options: BamlCallOptions = {},
    ) -> types.TestClassAlias:
      __tb__ = baml_options.get("tb", None)
      if __tb__ is not None:
        tb = __tb__._tb
      else:
        tb = None
      __cr__ = baml_options.get("client_registry", None)

      raw = await self.__runtime.call_function(
        "FnTestClassAlias",
        {
          "input": input,
        },
        self.__ctx_manager.get(),
        tb,
        __cr__,
      )
      mdl = create_model("FnTestClassAliasReturnType", inner=(types.TestClassAlias, ...))
      return coerce(mdl, raw.parsed())
    


class BamlStreamClient:
    __runtime: baml_py.BamlRuntime
    __ctx_manager: baml_py.BamlCtxManager

    def __init__(self, runtime: baml_py.BamlRuntime, ctx_manager: baml_py.BamlCtxManager):
      self.__runtime = runtime
      self.__ctx_manager = ctx_manager

    
    def FnTestAliasedEnumOutput(
        self,
        input: str,
        baml_options: BamlCallOptions = {},
    ) -> baml_py.BamlStream[Optional[types.TestEnum], types.TestEnum]:
      __tb__ = baml_options.get("tb", None)
      if __tb__ is not None:
        tb = __tb__._tb
      else:
        tb = None
      __cr__ = baml_options.get("client_registry", None)

      raw = self.__runtime.stream_function(
        "FnTestAliasedEnumOutput",
        {
          "input": input,
        },
        None,
        self.__ctx_manager.get(),
        tb,
        __cr__,
      )

      mdl = create_model("FnTestAliasedEnumOutputReturnType", inner=(types.TestEnum, ...))
      partial_mdl = create_model("FnTestAliasedEnumOutputPartialReturnType", inner=(Optional[types.TestEnum], ...))

      return baml_py.BamlStream[Optional[types.TestEnum], types.TestEnum](
        raw,
        lambda x: coerce(partial_mdl, x),
        lambda x: coerce(mdl, x),
        self.__ctx_manager.get(),
      )
    
    def FnTestClassAlias(
        self,
        input: str,
        baml_options: BamlCallOptions = {},
    ) -> baml_py.BamlStream[partial_types.TestClassAlias, types.TestClassAlias]:
      __tb__ = baml_options.get("tb", None)
      if __tb__ is not None:
        tb = __tb__._tb
      else:
        tb = None
      __cr__ = baml_options.get("client_registry", None)

      raw = self.__runtime.stream_function(
        "FnTestClassAlias",
        {
          "input": input,
        },
        None,
        self.__ctx_manager.get(),
        tb,
        __cr__,
      )

      mdl = create_model("FnTestClassAliasReturnType", inner=(types.TestClassAlias, ...))
      partial_mdl = create_model("FnTestClassAliasPartialReturnType", inner=(partial_types.TestClassAlias, ...))

      return baml_py.BamlStream[partial_types.TestClassAlias, types.TestClassAlias](
        raw,
        lambda x: coerce(partial_mdl, x),
        lambda x: coerce(mdl, x),
        self.__ctx_manager.get(),
      )
    

b = BamlAsyncClient(DO_NOT_USE_DIRECTLY_UNLESS_YOU_KNOW_WHAT_YOURE_DOING_RUNTIME, DO_NOT_USE_DIRECTLY_UNLESS_YOU_KNOW_WHAT_YOURE_DOING_CTX)

__all__ = ["b"]