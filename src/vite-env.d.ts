/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SITE_URL?: string;
  readonly VITE_WHATSAPP_NUMBER?: string;
  readonly VITE_CONTACT_EMAIL?: string;
  readonly VITE_AIRBNB_URL?: string;
  readonly VITE_MAP_LAT?: string;
  readonly VITE_MAP_LNG?: string;
  readonly VITE_GOOGLE_MAPS_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
