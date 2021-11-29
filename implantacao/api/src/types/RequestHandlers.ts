import { RequestHandler } from 'express'
import { CreateResponse, DeleteResponse, EnviarMoeda, ReadResponse, UpdateResponse } from './Responses'

///tipos dos handlers dos principais requests

export type CreateRequestHandler<TRequestBody = any> = RequestHandler<never, CreateResponse, TRequestBody>;

export type EnviarMPARequestHandler<TRequestBody = any> = RequestHandler<{ id: string }, EnviarMoeda, TRequestBody>;

export type GetAllRequestHandler<TModel> = RequestHandler<never, ReadResponse<TModel>, never>;

export type GetRequestHandler<TModel> = RequestHandler<{ id: string }, TModel | undefined | null>

export type GetAllSimpleRequestHandler<TModel> = RequestHandler<{ id: string }, TModel | undefined | null | TModel[]>

export type UpddateRequestHandler<TRequestBody = any> = RequestHandler<{ id: string }, UpdateResponse, TRequestBody>;

export type DeleteRequestHandler = RequestHandler<{ id: string }, DeleteResponse, never>;
