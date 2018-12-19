<template>
    <div id="contacts">
    	<div class="search-input">
    		<input type="text" v-model="search" placeholder="Поиск">
    	</div>
        <div class="menu">
            <ul>
                <li @click="addStatus = !addStatus">Добавить</li>
                <li @click="deleteAll">Удалить все</li>
            </ul>
        </div>
    
        <div id="contacts-list">

            <div class="form" v-if="addStatus">
                <div class="form-block">
                    <input type="text" 
                        class="input-form" 
                        v-model="name" 
                        placeholder="Введите имя">
                    <input type="text" 
                        class="input-form" 
                        v-model="description" 
                        placeholder="Введите описание контакта">
                </div>
                <div class="add-button" @click="addContact">+</div>
                <div class="error" v-if="error">Заполните все поля!</div>
            </div>

            <div class="contacts" v-if="list.length > 0">

                <ContactsItem 
                    v-for="(item, index, key) in searchList" 
                    :key="key" 
                    :index="index" 
                    :item="item"
                    @deleteItem="deleteItem"/>

            </div>

            <div class="info" v-else>
                Лист с контактами пуст.
            </div>
        </div>
        </div>
</template>

<style>
.menu ul {
    overflow: hidden;
    list-style: none;
    padding: 0;
    margin: 0;
}
.menu ul li {
    width: 125px;
    text-align: center;
    background: #dcdcdc;
    color: #636363;
    font-weight: 700;
    padding: 10px 0;
    user-select: none;
    cursor: pointer;
    float: left
}
.menu ul li:first-child {
    width: 124px;
    border-right: solid 1px #ccc;
}
.error {
    color: red;
    padding: 10px 0;
    font-size: 12px;
    float: left;
    width: 100%;
    text-align: center
}
body {
    background: #f2f2f2;
}
#contacts-list {
    background: #fff;
    margin: 0 auto;
    box-shadow: 0 2px 3px #ccc;
    height: 400px;
    position: relative;
    overflow: auto

}
#contacts {
    width: 250px;
    margin: 0 auto;
}
.input-form {
    background: #ffffff;
    border: 0;
    outline: none;
    padding: 10px;
    border-bottom: solid 1px #f2f2f2;
    margin: 0;
    width: 100%;
    box-sizing: border-box
}
.form {
    overflow: hidden;
    position: absolute;
    background: #ffffff;
    z-index: 99;
    box-shadow: 0 2px 3px rgba(0, 0, 0, .05)
}
.form-block {
    width: 200px;
    float: left
}
.add-button {
    width: 50px;
    float: left;
    user-select: none;
    background: #45de45;
    line-height: 72px;
    color: #fff;
    font-size: 36px;
    font-weight: 700;
    cursor: pointer;
}
.info {
    margin-top: 20px;
}
body {
    margin: 0;
    padding: 0;
}
.search-input {

}
input {
	width: 100%;
	border: 0;
	box-sizing: border-box;
	padding: 10px 15px;
	outline: none;
}
@media screen and (max-width: 768px) {
    #app {
        position: relative;
        min-height: 100vh;
        margin-top: 0;
    }
    #contacts {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translateY(-50%) translateX(-50%)
    }
}
</style>

<script>
import ContactsItem from './ContactsItem.vue'

export default {
    components: {
        ContactsItem
    },
    data() {
        return {
            name: '',
            description: '',
            error: false,
            search: '',
            addStatus: false,
            list: []
        }
    },
    methods: {
        addContact() {
            if(this.name != '' && this.description != '') {
                this.list.push({
                    "name": this.name,
                    "description": this.description
                })

                this.description = ''
                this.name = ''
                this.error = false
                this.addStatus = false

                localStorage.setItem('contactsList', JSON.stringify(this.list))

            } else {
                this.error = true
            }
        },
        deleteItem(index) {
            this.list.splice(index, 1)
            localStorage.setItem('contactsList', JSON.stringify(this.list))
        },
        deleteAll() {
            this.list = [],
            localStorage.removeItem('contactsList')
        }
    },
    computed: {
    	searchList() {
			return this.list.filter(contact => {
				return contact.name.toLowerCase().includes(this.search.toLowerCase())
			})
		},
    },
    mounted() {
        const contactsList = localStorage.getItem('contactsList');

        if(contactsList) {
            this.list = JSON.parse(contactsList)
        }
    }
}
</script>
