# NodeJS_Express_Mongo_Angular13
Realized by Rafa Ferri Torró and Sergi Biosca Beneyto

     It's our first project in 2 DAW with Nodejs and Mongo, it's website has second hand 
     products which are buy and put in sale by our clients. They can give a like and write 
     a comment in each product.

## Setup

### Node
      npm install nodejs
      npm install mongoose
      npm install express

### Bootstrap
      npm i @ng-bootstrap/ng-bootstrap@12.x.x --legacy-peer-deps
      npm install @popperjs/core --save --force

 ### PrimeNG
      npm install primeng --save
      npm install primeicons --save

### Fontawesome
      https://github.com/FortAwesome/angular-fontawesome/blob/5581dee5fc060ea5383e5a66bc3f3504bf491446/docs/usage/features.md#size

### Pagination
      npm install ngx-pagination --save

### SCSS
      npm install -g scss

### Auth
      npm install jsonwebtoken --save 
      npm install passport --save  
      npm install express-jwt --save  

### InfiniteScroll
      npm install --save ngx-infinite-scroll@10 --force
      npm install --save ngx-spinner@10 --force


## Architecture 

| Module     | Controller |
| ---      | ---       |
| Home |  Category, Carrousel, InfiniteScroll       |
| Shop     | Filters, Pagination , Likes      |
| Detail |  Comments    |
| Login     | NoAuthGuard, Regex, Validators, Token(JWT), Save Current User, Crypt Algorithms       |
| Register |  NoAuthGuard, Regex, Validators, Token(JWT), Save Current User, Crypt Algorithms              |
| Search     | Search      |
| Profile     |  AuthGuard, Children Router, Resolvers, ProfileGuard, Follow User, Upload User Image, User Statistics     |
