#!/bin/bash

echo "=== Test du Backend API ==="
echo

# Fonction pour tester une route
test_route() {
    local method=$1
    local url=$2
    local data=$3
    local description=$4
    
    echo "🧪 Test: $description"
    echo "   $method $url"
    
    if [ -n "$data" ]; then
        response=$(curl -s -w "\n%{http_code}" -X $method $url \
            -H "Content-Type: application/json" \
            -d "$data" 2>/dev/null)
    else
        response=$(curl -s -w "\n%{http_code}" -X $method $url 2>/dev/null)
    fi
    
    if [ $? -eq 0 ]; then
        http_code=$(echo "$response" | tail -n1)
        body=$(echo "$response" | head -n -1)
        
        if [ "$http_code" = "000" ]; then
            echo "   ❌ Connexion échouée - Serveur non accessible"
        else
            echo "   ✅ HTTP $http_code"
            if [ -n "$body" ] && [ "$body" != "Cannot GET /" ]; then
                echo "   📄 Réponse: $body"
            fi
        fi
    else
        echo "   ❌ Erreur de connexion"
    fi
    echo
}

# Attendre que le serveur soit prêt
echo "⏳ Vérification de la connexion au serveur..."
for i in {1..5}; do
    if curl -s http://localhost:3000 >/dev/null 2>&1; then
        echo "✅ Serveur accessible"
        break
    else
        echo "   Tentative $i/5..."
        sleep 2
    fi
done

# Tests des routes
test_route "GET" "http://localhost:3000" "" "Page d'accueil"

test_route "POST" "http://localhost:3000/auth/register" \
    '{"email":"test@example.com","password":"testpassword123"}' \
    "Enregistrement utilisateur"

test_route "POST" "http://localhost:3000/auth/login" \
    '{"email":"test@example.com","password":"testpassword123"}' \
    "Connexion utilisateur"

test_route "GET" "http://localhost:3000/annonce" "" "Liste des annonces"

test_route "GET" "http://localhost:3000/user" "" "Liste des utilisateurs"

test_route "GET" "http://localhost:3000/notification" "" "Liste des notifications"

echo "=== Tests terminés ==="