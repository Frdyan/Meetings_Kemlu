// src/services/meeting.services.js
import api from './api'

export const meetingService = {
    // Get all meetings untuk halaman agenda
    getAllMeetings() {
        return api.get('/meetings')
    },
    
    // Get latest 5 meetings untuk dashboard
    getLatestMeetings() {
        return api.get('/latest-meetings')
    },

    // Method lain yang mungkin dibutuhkan
    getMeetingById(id) {
        return api.get(`/meetings/${id}`)
    },
    
    createMeeting(data) {
        return api.post('/meetings', data)
    },
    
    updateMeeting(id, data) {
        return api.put(`/meetings/${id}`, data)
    },
    
    deleteMeeting(id) {
        return api.delete(`/meetings/${id}`)
    }
}