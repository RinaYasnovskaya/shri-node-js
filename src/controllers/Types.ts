import * as core from 'express-serve-static-core';
import express from 'express';

export interface RequestExp<
  ReqBody = any,
  ReqQuery = core.Query,
  ReqParams = core.ParamsDictionary
> extends express.Request<
  ReqParams,
  any,
  ReqBody,
  ReqQuery
> {  }

export interface ResponseExp extends express.Response { }
