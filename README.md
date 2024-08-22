# Job Board

Specialization Portfolio Project

## Quick links

<div>
    <ul>
        <li><a href="#installation">
            <strong>Installation</strong>
        </a></li>
        <li><a href="#usage">
            <strong>Usage</strong>
        </li></a>
    </ul>
</div>

## Installation

Install modules :

```bash
npm install
```

Run Server :

```bash
npm run dev server.js
```

## Usage

**Status**

```bash
curl localhost:5000/status ; echo ""
```

> {"db":true}

**Statistics**

```bash
curl localhost:5000/stats ; echo ""
```

> {"users":1,"jobs":100}

**Jobs Listing**

```bash
# without filters
curl localhost:5000/jobs?page=PAGE ; echo ""
# with filters
# curl 'localhost:5000/jobs?company=COMPANY&place=PLACE&types=TYPE1,TYPE2,...&experiences=EXP1,EXP2,...&salary=SALARY&margin=MARGIN' ; echo ""
curl 'localhost:5000/jobs?company=sqli&place=oujda&salary=8000&margin=300' ; echo ""
```

> {"numberOfResults": N, page: P, [...results]}

**Job Details**

```bash
curl localhost:5000/jobs/:ID ; echo ""
```
> {"_id":"66c270dfc8f594c442ace300","title":"backend se","company":"sqli","type":"on-site","place":"oujda","experience":"internship","salary":500,"description":"python, c#","applicants":[]}

**Registration**

```bash
curl localhost:5000/register -XPOST -H "Content-Type: application/json" -d '{ "email": "bob@dylan.com", "password": "toto1234!" }' ; echo ""
```

> {"id":"5f1e7d35c7ba06511e683b21","email":"<bob@dylan.com>"}

**Authentication**

```bash
curl localhost:5000/login -H "Authorization: Basic Ym9iQGR5bGFuLmNvbTp0b3RvMTIzNCE=" ; echo ""
```

> {"token":"TOKEN"}

```bash
curl localhost:5000/logout --cookie 'token=TOKEN' ; echo ""
```

> {"message": "Signed out successfully"}

**Profile**

```bash
curl localhost:5000/me --cookie 'token=TOKEN' ; echo ""
```

> {"id":"66c210f323b52b9b4637a729","email":"<bob@dylan.com>"}

**Posting jobs :**

```bash
curl localhost:5000/jobs -XPOST -H "Content-Type: application/json" -d '{ "title": "Back-end Developer", "company": "sqli", "type": "on-site", "place": "oujda", "experience": "internship", "salary": "500", "description": "python, c#" }' ; echo ""
```

> {"id":"66c26ec9fe8051b83cd70b91","title":"Back-end Developer","company":"sqli","type":"on-site","place":"oujda","experience":"internship","salary":500,"description":"python, c#","_id":"66c26ec9fe8051b83cd70b91"}

**Applying to jobs :**

```bash
curl localhost:5000/jobs/:ID  -XPOST --cookie 'token=TOKEN' ; echo ""
```

> {"message":"Successfully applied"}
