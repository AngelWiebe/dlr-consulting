import {
  Building2,
  Calendar,
  Clock,
  Coins,
  CreditCard,
  FileText,
  Handshake,
  LockKeyhole,
  Mail,
  Phone,
  Scale,
  ShieldCheck,
  Truck,
  Users,
  type LucideIcon,
} from 'lucide-react'

type IconName =
  | 'users'
  | 'handshake'
  | 'scale'
  | 'shield-check'
  | 'lock-keyhole'
  | 'building-2'
  | 'truck'
  | 'mail'
  | 'phone'
  | 'card'
  | 'document'
  | 'calendar'
  | 'clock'
  | 'coins'

const icons: Record<IconName, LucideIcon> = {
  users: Users,
  handshake: Handshake,
  scale: Scale,
  'shield-check': ShieldCheck,
  'lock-keyhole': LockKeyhole,
  'building-2': Building2,
  truck: Truck,
  mail: Mail,
  phone: Phone,
  card: CreditCard,
  document: FileText,
  calendar: Calendar,
  clock: Clock,
  coins: Coins,
}

export function Icon({ name }: { name: IconName }) {
  const Glyph = icons[name]

  return <Glyph className="icon" strokeWidth={2} aria-hidden="true" />
}
