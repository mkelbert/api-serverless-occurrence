'use strict'

const crypto = require('crypto');

module.exports = class User{
    constructor(aws, email, name, password){
        if(!aws) throw new Error('#ERRO_AWS_NOTFOUND');
        this.email = email;
        this.name = name;
        this.password = password;
    }

    set email(arg){
        this._email = arg;
    }
    get email(){
        return this._email;
    }

    set name(arg){
        this._name = arg;
    }
    get name(){
        return this._name;
    }

    set password(arg){
        this._password = crypto.createHash('md5').update(arg).digest("hex");
    }
    get password(){
        return this._password;
    }

    toString(){
        return {
            email: this.email,
            name: this.name,
            password: this.password
        }
    }
}