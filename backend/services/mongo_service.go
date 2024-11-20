package services

import "context"

type MongoService interface {
    Insert(ctx context.Context, collection string, document interface{}) error
    Find(ctx context.Context, collection string, filter interface{}) ([]interface{}, error)
}
