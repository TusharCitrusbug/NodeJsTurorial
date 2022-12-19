const fs = require('fs')
const chalk = require('chalk')

const getNotes = (title) => {
    const notes = loadNotes();
    const foundedNote = notes.find((note) => {
        return note.title === title
    })
    console.log(foundedNote);
}

const addNote = (title, body) => {
    const notes = loadNotes()
    const duplicateNotes = notes.filter((note) => {
        return note.title === title
    })

    if (duplicateNotes.length === 0) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log('New note added!')
    } else {
        console.log('Note title is already taken!')
    }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }
}

const removeNote = (title) => {
    const notes = loadNotes();
    const remainingNotes = notes.filter((note) => {
        return note.title !== title
    })

    if (notes.length > remainingNotes.length) {
        console.log(chalk.green.inverse(`Note with title ${title} is removed successfully !`));
        saveNotes(remainingNotes);
    }
    else {
        console.log(chalk.red.inverse(`Note with title ${title} Not found !`));
    }
}


const listNotes = () => {
    console.log(chalk.blue.inverse("Your notes"));
    const notes = loadNotes();
    console.log(notes);
}

module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes

}