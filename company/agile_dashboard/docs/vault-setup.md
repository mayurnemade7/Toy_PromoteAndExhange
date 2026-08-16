# HashiCorp Vault Setup for Firebase Secrets

## 1. Store secrets in Vault

```bash
# Authenticate to Vault
vault login $VAULT_TOKEN

# Write Firebase secrets
vault kv put secret/toy-exchange/firebase \
  apiKey="your-actual-api-key" \
  authDomain="kids-toys-project.firebaseapp.com" \
  projectId="kids-toys-project" \
  storageBucket="kids-toys-project.appspot.com" \
  messagingSenderId="950514609792" \
  appId="your-actual-app-id"

# Verify
vault kv get secret/toy-exchange/firebase
```

## 2. GitHub Secrets to configure (Settings → Secrets → Actions)

| Secret Name | Value | Source |
|---|---|---|
| `VAULT_ADDR` | `https://your-vault-server.com` | Your Vault server URL |
| `VAULT_TOKEN` | `hvs.xxxx` | Vault token (or use OIDC — see workflow) |
| `FIREBASE_SERVICE_ACCOUNT` | JSON key | Firebase Console → Service Accounts |

## 3. Recommended: Use OIDC (no long-lived Vault tokens)

In your Vault server, configure a JWT auth method for GitHub Actions:

```bash
# Enable JWT auth
vault auth enable jwt

# Configure with GitHub OIDC
vault write auth/jwt/config \
  oidc_discovery_url="https://token.actions.githubusercontent.com" \
  bound_issuer="https://token.actions.githubusercontent.com"

# Create a policy
vault policy write github-agile-dashboard - <<EOF
path "secret/data/toy-exchange/firebase" {
  capabilities = ["read"]
}
EOF

# Create a role (restrict to your repo)
vault write auth/jwt/role/github-actions-agile-dashboard \
  role_type="jwt" \
  bound_audiences="https://github.com/mayurnemade" \
  bound_claims='{"repository":"mayurnemade/Toy_PromoteAndExhange"}' \
  user_claim="actor" \
  policies="github-agile-dashboard" \
  ttl="5m"
```

Then in the workflow, replace `token:` with:
```yaml
method: jwt
role: github-actions-agile-dashboard
```

## 4. Local Development

```bash
# Copy template
cp .env.example .env

# Fill your Firebase keys in .env
# Then generate config:
node generate-firebase-config.js

# Open dashboard
open company/agile_dashboard/index.html
```

## 5. What is committed vs gitignored

| File | Committed | Notes |
|---|---|---|
| `.env.example` | ✅ Yes | Template only, no real values |
| `firebase-config.example.js` | ✅ Yes | Template only |
| `generate-firebase-config.js` | ✅ Yes | Build script |
| `.github/workflows/deploy-agile-dashboard.yml` | ✅ Yes | Pipeline |
| `.env` | ❌ Gitignored | Your local secrets |
| `firebase-config.js` | ❌ Gitignored | Auto-generated |
