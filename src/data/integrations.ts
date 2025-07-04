import { IntegrationIcons } from "@/components/integrations/icons";

export const integrations = [
  { id: 'facebook', name: 'Facebook', description: 'Connect your Facebook account to publish on it.', connected: false, icon: IntegrationIcons.facebook, color: '#1877F2' },
  { id: 'youtube', name: 'Youtube', description: 'Connect your Youtube account to publish on it.', connected: false, icon: IntegrationIcons.youtube, color: '#FF0000' },
  { id: 'sonority', name: 'Sonority', description: 'Connect your Sonority account.', connected: false, icon: IntegrationIcons.sonority, color: '#4A90E2' },
  { id: 'videoreel', name: 'VideoReel', description: 'Connect your Videoreel account.', connected: false, icon: IntegrationIcons.videoreel, color: '#50E3C2' },
  { id: 'syvid', name: 'Syvid', description: 'Connect your Syvid account.', connected: false, icon: IntegrationIcons.syvid, color: '#BD10E0' },
  { id: 'elevenlabs', name: 'ElevenLabs', description: 'Connect your ElevenLabs account for voiceover.', connected: false, icon: IntegrationIcons.elevenlabs, color: '#FFFFFF' },
];