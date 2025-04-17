'use strict'

async function userContacts() {
    try {
        const url = `https://whats-api-2025.onrender.com/v1/whatsapp/dados-contatos/?numero=11987876567`
        const response = await fetch(url)
        const data = await response.json()
        const contactList = []
        const contacts = data.contatos
        contacts.forEach(function (item) {
            contactList.push(item)
        })

        return contactList
    } catch (error) {
        console.log('Erro em userContacts:', error)
        return []
    }
}

async function columnContact() {
    try {
        const contacts = await userContacts()
        const listContact = document.getElementById('contact-list')

        contacts.forEach(function (item) {
            try {
                const contactCard = document.createElement('div')
                contactCard.classList.add('contact-card')

                const nameContact = document.createElement('h2')
                nameContact.textContent = item.nome

                const descContact = document.createElement('p')
                descContact.textContent = item.descricao

                contactCard.addEventListener('click', async function () {
                    const chatContainer = document.getElementById('messages')
                    chatContainer.replaceChildren('')
                    let msg = await contactChat(item)
                    msg.forEach(createMessageCard)                    
    
                })

                contactCard.appendChild(nameContact)
                contactCard.appendChild(descContact)
                listContact.appendChild(contactCard)
            } catch (error) {
                console.log('Erro ao criar card de contato:', error)
            }
        })
    } catch (error) {
        console.log('Erro em columnContact:', error)
    }
}

async function contactChat(item) {
    try {
        const url = `https://whats-api-2025.onrender.com/v1/whatsapp/conversas-usuario/?numero=11987876567`
        const response = await fetch(url)
        const data = await response.json()
        const contacts = data.conversas

        const messages = []

        contacts.forEach(function (contact) {
            if (contact.nome === item.nome) {
                contact.mensagens.forEach(function (msg) {
                    messages.push(msg)                    
                })
            }
        })

        return messages

    } catch (error) {
        console.log('Erro em contactChat:', error)
    }
}


function createMessageCard(message) {
    try {
        const chatContainer = document.getElementById('messages')

        const messageCard = document.createElement('div')
        messageCard.classList.add('message-card')

        if (message.sender == 'me') {
            messageCard.classList.add('sent')
        } else {
            messageCard.classList.add('received')
        }

        const content = document.createElement('p')
        content.textContent = message.content

        const time = document.createElement('span')
        time.classList.add('message-time')
        time.textContent = message.time

        messageCard.appendChild(content)
        messageCard.appendChild(time)
        chatContainer.appendChild(messageCard)

        return true
        
    } catch (error) {
        console.log('Erro em createMessageCard:', error)
        return document.createElement('div') 
    }
}


// Início da aplicação
columnContact()
