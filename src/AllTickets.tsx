import { useEffect, useState } from 'react'
import { supabase } from '../tickets'

export default function AllTickets() {
  const [tickets, setTickets] = useState<any[]>([])

  useEffect(() => {
    const fetchTickets = async () => {
      const { data, error } = await supabase.from('tickets').select('*').order('created', { ascending: false })
      if (data) setTickets(data)
    }

    fetchTickets()
  }, [])

  return (
    <div>
      <h2>All Tickets</h2>
      <table border={1}>
        <thead>
          <tr>
            <th>Ticket</th>
            <th>Type</th>
            <th>Priority</th>
            <th>Status</th>
            <th>Assignee</th>
            <th>Requester</th>
            <th>Created</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map(ticket => (
            <tr key={ticket.id}>
              <td>{ticket.ticket}</td>
              <td>{ticket.type}</td>
              <td>{ticket.priority}</td>
              <td>{ticket.status}</td>
              <td>{ticket.assignee}</td>
              <td>{ticket.requester}</td>
              <td>{new Date(ticket.created).toLocaleString()}</td>
              <td>{ticket.actions}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
