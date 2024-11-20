package config

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
)

// Config structure pour les paramètres de configuration
type Config struct {
	MongoURI string `json:"mongo_uri"`
	DBName   string `json:"db_name"`
}

// LoadConfig charge la configuration à partir du fichier config.json
func LoadConfig() *Config {
	// Lire le fichier de configuration
	file, err := ioutil.ReadFile("config.json")
	if err != nil {
		log.Fatalf("Error reading config file: %v", err)
	}

	var config Config
	// Déserialiser le contenu JSON dans la structure Config
	if err := json.Unmarshal(file, &config); err != nil {
		log.Fatalf("Error unmarshalling config file: %v", err)
	}

	// Afficher la configuration (optionnel)
	fmt.Println("Mongo URI:", config.MongoURI)
	fmt.Println("DB Name:", config.DBName)

	return &config
}
