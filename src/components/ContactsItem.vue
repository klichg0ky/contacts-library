<template>
    <div class="contacts__item" v-if="!editStatus">
        <div class="contacts__inner">
            <div class="count">{{ index+1 }}</div>
            <div class="contacts__name">{{ item.name }}</div>
            <div class="contacts__description">{{ item.description }}</div>
            <div class="contacts__controls">
                <div class="edit" @click="editStatus = true"><i class="fa fa-pencil"></i></div>
                <div class="delete" @click="$emit('deleteItem', index)"><i class="fa fa-times"></i></div>
            </div>
        </div>
        
    </div>
    <div class="contacts__edit" v-else>
        <div class="contacts__form">
            <input type="text" placeholder="Имя" v-model="item.name">
            <input type="text" placeholder="Описание" v-model="item.description">
        </div>
        <button class="editCheck" @click="editStatus = false"><i class="fa fa-check"></i></button>
    </div>

</template>

<style>
.contacts__edit {
    overflow: hidden;
    text-align: left;
    position: relative;
}
.editCheck {
    background: #45de45;
    border: 0;
    width: 20%;
    height: 72px;
    float: left;
    color: #fff;
    cursor: pointer;
}
.contacts__form {
    width: 80%;
    float: left;

}
.contacts__form input {
    width: 100%;
    border: 0;
    padding: 10px 10px;
    color: #424242;
    border-bottom: 1px solid #ccc;
}
.contacts__form input::placeholder {
    color: #cccccc;
}
.contacts__controls {
    position: absolute;
    right: 15px;
    top: 50%;
    transform: translateY(-50%);
}
.contacts__controls div {
    cursor: pointer;
}
.contacts__item {
    padding: 10px 25px;
    border-bottom: solid 1px #f2f2f2;
    text-align: left;
    position: relative;
}
.count {
    position: absolute;
    top: 50%;
    left: 5px;
    font-weight: 700;
    font-size: 24px;
    transform: translateY(-50%)
}
.contacts__name {
    font-weight: 700;
    font-size: 14px;
    color: #424242;
}
.contacts__description {
    font-size: 12px;
}
</style>

<script>
export default {
    props: ['item', 'index'],
    data() {
        return {
            editStatus: false
        }
    }
}
</script>
