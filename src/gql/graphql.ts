/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Chat = {
  __typename?: 'Chat';
  _id: Scalars['ID']['output'];
  isPrivate: Scalars['Boolean']['output'];
  name?: Maybe<Scalars['String']['output']>;
  userId: Scalars['String']['output'];
  userIds: Array<Scalars['String']['output']>;
};

export type CreateChatInput = {
  isPrivate: Scalars['Boolean']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  userIds?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type CreateUserInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createChat: Chat;
  createUser: User;
  removeChat: Chat;
  removeUser: User;
  updateChat: Chat;
  updateUser: User;
};


export type MutationCreateChatArgs = {
  createChatInput: CreateChatInput;
};


export type MutationCreateUserArgs = {
  createUserInput: CreateUserInput;
};


export type MutationRemoveChatArgs = {
  id: Scalars['Int']['input'];
};


export type MutationUpdateChatArgs = {
  updateChatInput: UpdateChatInput;
};


export type MutationUpdateUserArgs = {
  updateUserInput: UpdateUserInput;
};

export type Query = {
  __typename?: 'Query';
  chat: Chat;
  chats: Array<Chat>;
  me: User;
  user: User;
  users: Array<User>;
};


export type QueryChatArgs = {
  id: Scalars['Int']['input'];
};


export type QueryUserArgs = {
  _id: Scalars['String']['input'];
};

export type UpdateChatInput = {
  id: Scalars['Int']['input'];
  isPrivate?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  userIds?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type UpdateUserInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  _id: Scalars['ID']['output'];
  email: Scalars['String']['output'];
};

export type CreateUserMutationVariables = Exact<{
  createUserInput: CreateUserInput;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'User', _id: string, email: string } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename?: 'User', _id: string, email: string } };


export const CreateUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"createUserInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateUserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createUserInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"createUserInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]} as unknown as DocumentNode<CreateUserMutation, CreateUserMutationVariables>;
export const MeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]} as unknown as DocumentNode<MeQuery, MeQueryVariables>;