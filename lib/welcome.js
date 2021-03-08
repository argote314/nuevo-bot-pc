const fs = require('fs-extra') // Modulo para leitura do welcome.json

module.exports = welcome = async (kill, event) => {
    const welkom = JSON.parse(fs.readFileSync('./lib/welcome.json')) // Isso verifica se o grupo está na lista dos que vão usar o welcome
    const isWelkom = welkom.includes(event.chat)
    try {
        if (event.action == 'add' && isWelkom) {
            const gChat = await kill.getChatById(event.chat)
            const { contact, groupMetadata, name } = gChat
			    
				await kill.sendTextWithMentions(event.chat, `*❐❯─᤻─⃟᤻─᤻─᤻─᤻─᤻「⃞🌎⃞」─᤻─᤻─᤻─⃟᤻─᤻─᤻❮❐*\n\n *Bienvenido* @${event.who.replace('@c.us', '')}!  \n\n*┏━┅┅┅┅┅┅┄⟞⟦ ⟝┄┉┉┅┅┅┅━┓*\n  *A* ${name} \n*┗━┅┅┅┅┅┅┅┄⟞⟦ ⟝┄┅┅┅┉┉━┛*\n\n _*Deseo que te diviertas y que sigas nuestras reglas!*_ ✅ \n\n*S᤻i᤻ n᤻e᤻c᤻e᤻s᤻it᤻a᤻ a᤻y᤻᤻u᤻d᤻a᤻*\n*❐⃟✓* Comuniquese de con un administrador\n*❐⃟✓* Escriba /menu para ver las opciones`)
			}
			// Acima é para caso alguém entre ou seja adicionado
			// Abaixo é para caso saia ou seja removido
		if (event.action == 'remove' && isWelkom) {
			const profile = await kill.getProfilePicFromServer(event.who)
			if (profile == '' || profile == undefined) profile = 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTQcODjk7AcA4wb_9OLzoeAdpGwmkJqOYxEBA&usqp=CAU'
			    await kill.sendFileFromUrl(event.chat, profile, 'profile.jpg', '')
				await kill.sendTextWithMentions(event.chat, `Fue un placer tenerlo @${event.who.replace('@c.us', '')} , pero bueno, igual no lo recordaremos,bye`)
			}
    } catch (err) {
        console.log(err)
    }
}
