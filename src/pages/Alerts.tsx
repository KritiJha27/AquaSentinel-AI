import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { AlertTriangle } from 'lucide-react'
import { DemoBanner, SectionTitle } from '../components/Layout'
import { AlertCard } from '../components/AlertCard'
import { Modal } from '../components/Modal'
import { Timeline } from '../components/Timeline'
import { MapPanel } from '../components/MapPanel'
import { useApp } from '../context/AppContext'
import type { Alert } from '../types'
import { severityColor } from '../data/demoData'

const priorityZones = [
  { id: 'z1', name: 'Priority Zone 01', area: 'Fort Kochi Lowlands', score: 94, severity: 'extreme', reason: 'Extreme flood severity, dense population, limited high ground' },
  { id: 'z2', name: 'Priority Zone 02', area: 'Willingdon Island', score: 82, severity: 'high', reason: 'High exposure, critical infrastructure, constrained access' },
  { id: 'z3', name: 'Priority Zone 03', area: 'Marine Drive', score: 68, severity: 'high', reason: 'Moderate risk, commercial density, evacuation route choke points' },
]

export const Alerts: React.FC = () => {
  const { alerts, acknowledgeAlert } = useApp()
  const [whyOpen, setWhyOpen] = useState(false)
  const [whyAlert, setWhyAlert] = useState<Alert | null>(null)

  const openWhy = (a: Alert) => {
    setWhyAlert(a)
    setWhyOpen(true)
  }

  return (
    <div className="pt-16 min-h-screen">
      <DemoBanner />
      <div className="max-w-[1600px] mx-auto px-4 md:px-6 py-8">
        <SectionTitle
          title="AI Early Warning Center"
          badge="EARLY WARNING ENGINE"
          subtitle="Alerts generated from the fused AI pipeline. Severity, confidence and recommended actions are AI decision-support."
        />

        <div className="flex flex-wrap gap-3 mb-6">
          {[
            { l: 'Advisory', c: '#3b82f6' },
            { l: 'Watch', c: '#eab308' },
            { l: 'Warning', c: '#f97316' },
            { l: 'Emergency', c: '#ef4444' },
          ].map((s) => (
            <div key={s.l} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/10">
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: s.c }} />
              <span className="text-xs font-semibold" style={{ color: s.c }}>{s.l}</span>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {alerts.map((a) => (
            <AlertCard key={a.id} alert={a} onViewWhy={openWhy} />
          ))}
        </div>

        {alerts.length === 0 && (
          <div className="glass p-10 text-center text-slate-400">
            <p className="text-lg">✅ No active alerts</p>
            <p className="text-sm text-slate-500 mt-1">All alerts acknowledged.</p>
          </div>
        )}

        <div className="mt-10">
          <SectionTitle
            title="AI Evacuation Priority"
            badge="DECISION SUPPORT"
            subtitle="Conceptual ranking of areas based on flood severity, population exposure, vulnerability, access and water depth. AI decision-support, not autonomous authority decision."
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <div className="space-y-3">
              {priorityZones.map((z, i) => {
                const color = severityColor(z.severity)
                return (
                  <motion.div
                    key={z.id}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="glass p-4 border-l-4"
                    style={{ borderLeftColor: color }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <span className="inline-block text-[10px] font-mono px-2 py-0.5 rounded-md bg-white/10 text-slate-300 mb-1">RANK {String(i + 1).padStart(2, '0')}</span>
                        <div className="text-sm font-bold text-white">{z.name}</div>
                        <div className="text-xs text-slate-400">{z.area}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold" style={{ color }}>{z.score}</div>
                        <div className="text-[10px] text-slate-500">priority score</div>
                      </div>
                    </div>
                    <p className="text-xs text-slate-400">{z.reason}</p>
                  </motion.div>
                )
              })}
            </div>

            <div className="glass p-4">
              <div className="text-xs font-semibold text-slate-400 mb-3">Priority Zones Map</div>
              <MapPanel height="400px" showControls={false} />
            </div>
          </div>
        </div>

        <div className="mt-10">
          <SectionTitle
            title="Warning Timeline"
            badge="ALERT HISTORY"
          />
          <div className="glass p-5">
            <Timeline
              items={[
                { title: 'Advisory Issued', subtitle: 'Elevated rainfall expected', time: 'Sep 04 · 08:00', status: 'done' },
                { title: 'Watch Elevated', subtitle: 'Model consensus rising', time: 'Sep 04 · 11:00', status: 'done' },
                { title: 'Warning Issued', subtitle: 'Flash flood risk in lowlands', time: 'Sep 04 · 14:00', status: 'current' },
                { title: 'Emergency Escalation', subtitle: 'Fort Kochi evacuation prep', time: 'Sep 04 · 16:00 (projected)', status: 'upcoming' },
              ]}
            />
          </div>
        </div>
      </div>

      <Modal open={whyOpen} onClose={() => setWhyOpen(false)} title="Why This Warning?">
        {whyAlert && (
          <div>
            <p className="text-sm text-slate-400 mb-4">
              <strong className="text-white">{whyAlert.title}</strong> · {whyAlert.location}. Flood risk increased because:
            </p>

            <div className="space-y-3">
              {whyAlert.factors.map((f, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className="rounded-lg bg-white/[0.03] border border-white/5 px-3 py-2.5"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className={`font-bold ${f.positive ? 'text-emerald-400' : 'text-red-400'}`}>
                        {f.positive ? '-' : '+'}
                      </span>
                      <span className="text-xs text-slate-200">{f.label}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-mono text-amber-300">{f.magnitude}</span>
                      <span className="text-[11px] font-mono text-slate-400 w-9 text-right">+{f.weight}%</span>
                    </div>
                  </div>
                  <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: f.positive ? '#22c55e' : '#ef4444' }}
                      initial={{ width: 0 }}
                      animate={{ width: `${f.weight}%` }}
                      transition={{ duration: 0.8, delay: 0.2 + i * 0.06 }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-4 flex items-center justify-between rounded-xl p-3.5 border border-red-400/30 bg-red-500/10">
              <div className="flex items-center gap-2">
                <AlertTriangle size={18} className="text-red-400" />
                <span className="text-xs text-slate-300">FINAL FLOOD RISK</span>
              </div>
              <span className="text-lg font-extrabold text-red-400">{whyAlert.severity === 'emergency' ? 'EXTREME' : 'HIGH'}</span>
            </div>

            <p className="text-[11px] text-slate-500 mt-4">
              Explainable AI surfaces the dominant contributing factors behind each prediction to build trust and enable actionable decisions.
            </p>
          </div>
        )}
      </Modal>
    </div>
  )
}
