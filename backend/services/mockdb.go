package services

import (
	"github.com/globalsign/mgo"
)

var MockSession *mgo.Session

func ConnectMockDB() {
    session, err := mgo.Dial("localhost") // Mock: Pas besoin d'une vraie connexion
    if err != nil {
        panic(err)
    }

    MockSession = session
}

func GetMockCollection(name string) *mgo.Collection {
    return MockSession.DB("testdb").C(name)
}
