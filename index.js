const {createMongoAbility, AbilityBuilder} = require ('@casl/ability')

const defineAbility = (user = {}) =>{
    const {can,cannot,build} = new AbilityBuilder(createMongoAbility);
    if(user.isAdmin){
        can('manage', 'all');
    }else{
        can('read','Posts')
        can('update','Posts', {authorId: user.id});
    }
    return build();
}

const user = {
    id : 5,
    isAdmin : true
}

class Post {
    constructor(authorId){
        this.authorId = authorId
    }
}

const SomePost = new Post(5);

const ability = defineAbility(user)

const isAllowed = ability.can('update', SomePost);

console.log(isAllowed)
