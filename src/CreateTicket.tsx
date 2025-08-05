import { useState } from 'react'
import { supabase } from '../tickets'

export default function CreateTicket() {
  const [form, setForm] = useState({
    ticket: '',
    type: '',
    priority: '',
    status: 'Open',
    assignee: '',
    requester: '',
    actions: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const submitTicket = async () => {
    const { data, error } = await supabase.from('tickets').insert([
      {
        ...form,
        created: new Date().toISOString(),
      }
    ])

    if (error) {
      alert('Failed to submit: ' + error.message)
    } else {
      alert('Ticket submitted successfully!')
      setForm({
        ticket: '',
        type: '',
        priority: '',
        status: 'Open',
        assignee: '',
        requester: '',
        actions: '',
      })
    }
  }

  return (
    <div>
      <h2>Create Ticket</h2>
      <input
        type="text"
        name="ticket"
        placeholder="Ticket Title"
        value={form.ticket}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="type"
        placeholder="Type (e.g., Bug)"
        value={form.type}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="priority"
        placeholder="Priority (e.g., High)"
        value={form.priority}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="assignee"
        placeholder="Assignee"
        value={form.assignee}
        onChange={handleChange}
      />
      <input
        type="text"
        name="requester"
        placeholder="Requester"
        value={form.requester}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="actions"
        placeholder="Actions"
        value={form.actions}
        onChange={handleChange}
      />

      <br /><br />
      <button onClick={submitTicket}>Submit Ticket</button>
    </div>
  )
}

