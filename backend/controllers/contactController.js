import Contact from '../models/Contact.js'

const createContact = async (req, res) => {
  try {
    const { name, email, message } = req.body
    if (!name || !email || !message) return res.status(400).json({ message: 'All fields required' })

    const contact = await Contact.create({ name, email, message })
    res.status(201).json(contact)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error' })
  }
}

export { createContact }
