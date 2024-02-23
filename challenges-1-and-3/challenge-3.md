## System Design for Multi-tenant SaaS Gaming Platform

### 1. Domain-based Service Delivery
Set up a system where the website domain decides what games and tools show up. This needs:
- **Reverse Proxy**: This tool guides incoming requests to the right service inside your platform based on their domain.
- **Dynamic Content Configuration**: Your platform automatically picks which games and backoffice tools to show based on the domain asking for them.

### 2. Users Table Changes
To let many gaming sites use the platform, we need to change the users table so we can tell users apart by their site:
- **Add a Domain Column**: Put in a new column called `domain` or `tenant_id` in the users table. This tells us which gaming site a user comes from.
- **Make a Combo Key for Users**: Combine `email` and `domain` to make sure a user is unique across different sites. This way, the same email can work on more than one site without mix-ups.

### 3. Keeping User Logins to Their Own Domain
Make sure when a user logs in, they can only get into their own gaming site, not others:
- **Scoped Authentication Tokens**: Give out login tokens that carry the domain info inside. This happens when a user logs in.
- **Check Token's Domain**: Use special checking in the backend that looks at the token's domain and matches it with the domain of what they want to access. This stops a login token from one site from working on another site.
