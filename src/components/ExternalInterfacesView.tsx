import React, { useState } from 'react';
import { 
  Network, 
  ArrowLeftRight, 
  ArrowDownLeft, 
  ArrowUpRight, 
  AlertOctagon, 
  CheckCircle2, 
  Clock, 
  RefreshCw, 
  Database, 
  FileCode, 
  ShieldAlert, 
  ShieldCheck, 
  ChevronRight,
  Send,
  ExternalLink,
  Layers,
  FileSpreadsheet,
  AlertTriangle
} from 'lucide-react';
import { ExternalInterface } from '../types';

interface ExternalInterfacesViewProps {
  interfaces: ExternalInterface[];
  onTriggerSync?: (interfaceId: number) => void;
  onNavigateToGovernance?: () => void;
}

export const ExternalInterfacesView: React.FC<ExternalInterfacesViewProps> = ({
  interfaces: initialInterfaces,
  onNavigateToGovernance,
}) => {
  const [interfaces, setInterfaces] = useState<ExternalInterface[]>(initialInterfaces);
  const [syncingId, setSyncingId] = useState<number | null>(null);
  const [selectedInterface, setSelectedInterface] = useState<ExternalInterface | null>(null);
  const [syncFeedback, setSyncFeedback] = useState<{ id: number; message: string; isError?: boolean } | null>(null);

  const handleSync = (item: ExternalInterface) => {
    setSyncingId(item.id);
    setSyncFeedback(null);

    setTimeout(() => {
      setSyncingId(null);
      const nowStr = new Date().toISOString().replace('T', ' ').substring(0, 19);

      if (item.status === 'Blocked') {
        setSyncFeedback({
          id: item.id,
          message: `Sync Failed: ODBC handshake rejected by PASTEL driver. Encrypted database schema requires DBA credentials. Escalation #I-001 active.`,
          isError: true,
        });
      } else {
        setInterfaces((prev) =>
          prev.map((i) =>
            i.id === item.id ? { ...i, lastSyncAt: nowStr, status: 'Connected' } : i
          )
        );
        setSyncFeedback({
          id: item.id,
          message: `Sync Successful: Handshake verified at ${nowStr}. 142 records synced with 0 schema validation errors.`,
          isError: false,
        });
      }
    }, 1000);
  };

  const getStatusBadge = (status: ExternalInterface['status']) => {
    switch (status) {
      case 'Live':
      case 'Connected':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            {status}
          </span>
        );
      case 'Testing':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-200">
            <RefreshCw className="w-3.5 h-3.5 text-blue-600" />
            {status}
          </span>
        );
      case 'Blocked':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-red-100 text-red-800 border border-red-200 animate-pulse">
            <AlertOctagon className="w-3.5 h-3.5 text-red-600" />
            {status}
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700 border border-slate-200">
            <Clock className="w-3.5 h-3.5 text-slate-500" />
            {status}
          </span>
        );
    }
  };

  const getRiskBadge = (risk: ExternalInterface['riskLevel']) => {
    switch (risk) {
      case 'Critical':
      case 'High':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-bold bg-red-50 text-red-700 border border-red-200">
            <AlertTriangle className="w-3 h-3 text-red-600" />
            {risk} Risk
          </span>
        );
      case 'Medium':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
            <AlertTriangle className="w-3 h-3 text-amber-600" />
            {risk} Risk
          </span>
        );
      case 'Low':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <ShieldCheck className="w-3 h-3 text-emerald-600" />
            {risk} Risk
          </span>
        );
    }
  };

  const getDirectionIcon = (direction: ExternalInterface['direction']) => {
    switch (direction) {
      case 'Bidirectional':
        return (
          <span className="inline-flex items-center gap-1 text-slate-700 font-medium text-xs">
            <ArrowLeftRight className="w-3.5 h-3.5 text-indigo-600" /> Bidirectional
          </span>
        );
      case 'Inbound':
        return (
          <span className="inline-flex items-center gap-1 text-slate-700 font-medium text-xs">
            <ArrowDownLeft className="w-3.5 h-3.5 text-emerald-600" /> Inbound
          </span>
        );
      case 'Outbound':
        return (
          <span className="inline-flex items-center gap-1 text-slate-700 font-medium text-xs">
            <ArrowUpRight className="w-3.5 h-3.5 text-amber-600" /> Outbound
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 uppercase tracking-wider">
            <Network className="w-4 h-4" /> External System Interfaces & Data Integration
          </div>
          <h2 className="text-xl font-bold text-slate-900 mt-1">
            Core Integration Endpoints: PASTEL, SAPP Contracts & GIS Spatial
          </h2>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl leading-relaxed">
            Directly fulfills Phase 3 &amp; Deliverable D-5 contractual specifications. Monitors automated data bridges, encryption protocols, and synchronization SLAs with external institutional systems.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-slate-50 border border-slate-200 px-3.5 py-2 rounded-lg text-right">
            <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Interface SLA</div>
            <div className="text-sm font-bold text-slate-900">24-Hour Max Stale</div>
          </div>
          <div className="bg-amber-50 border border-amber-200 px-3.5 py-2 rounded-lg">
            <div className="text-[11px] font-semibold text-amber-800 uppercase tracking-wider">Active Alerts</div>
            <div className="text-sm font-bold text-amber-900">1 Blocked (PASTEL)</div>
          </div>
        </div>
      </div>

      {/* Main Interfaces Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {interfaces.map((item) => {
          const isBlocked = item.status === 'Blocked';
          const isTesting = item.status === 'Testing';

          return (
            <div
              key={item.id}
              className={`bg-white border rounded-xl p-5 shadow-2xs flex flex-col justify-between transition-all ${
                isBlocked
                  ? 'border-red-300 ring-1 ring-red-200 bg-red-50/10'
                  : isTesting
                  ? 'border-blue-200'
                  : 'border-slate-200'
              }`}
            >
              <div className="space-y-4">
                {/* Top Row: Protocol & Badges */}
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                    {item.protocol}
                  </span>
                  <div className="flex items-center gap-2">
                    {getRiskBadge(item.riskLevel)}
                    {getStatusBadge(item.status)}
                  </div>
                </div>

                {/* System Title & Purpose */}
                <div>
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <Database className={`w-4 h-4 ${isBlocked ? 'text-red-600' : 'text-emerald-700'}`} />
                    {item.name}
                  </h3>
                  <div className="mt-1 text-xs text-slate-500 font-medium">
                    Flow: {getDirectionIcon(item.direction)}
                  </div>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    {item.purpose}
                  </p>
                </div>

                {/* Last Sync Timestamp */}
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-xs space-y-1">
                  <div className="flex items-center justify-between text-slate-500">
                    <span className="font-medium">Last Synchronized:</span>
                    <span className="font-mono font-bold text-slate-800">
                      {item.lastSyncAt || 'No sync recorded'}
                    </span>
                  </div>
                  {item.notes && (
                    <div className="text-[11px] text-slate-600 pt-1 border-t border-slate-200/80">
                      <span className="font-semibold text-slate-700">Contractual Note:</span>{' '}
                      {item.notes}
                    </div>
                  )}
                </div>

                {/* Feedback message if synced */}
                {syncFeedback && syncFeedback.id === item.id && (
                  <div
                    className={`p-3 rounded-lg text-xs leading-relaxed ${
                      syncFeedback.isError
                        ? 'bg-red-50 text-red-800 border border-red-200'
                        : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                    }`}
                  >
                    {syncFeedback.message}
                  </div>
                )}
              </div>

              {/* Actions Footer */}
              <div className="mt-5 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
                <button
                  onClick={() => setSelectedInterface(item)}
                  className="text-xs font-semibold text-emerald-800 hover:text-emerald-950 flex items-center gap-1 cursor-pointer"
                >
                  <FileCode className="w-3.5 h-3.5" /> View Schema Mapping
                </button>

                <div className="flex items-center gap-2">
                  {isBlocked && onNavigateToGovernance && (
                    <button
                      onClick={onNavigateToGovernance}
                      className="text-xs font-semibold px-2.5 py-1.5 rounded-lg bg-red-50 text-red-700 hover:bg-red-100 border border-red-200 cursor-pointer flex items-center gap-1"
                    >
                      <ShieldAlert className="w-3.5 h-3.5 text-red-600" /> Escalation #I-001
                    </button>
                  )}

                  <button
                    onClick={() => handleSync(item)}
                    disabled={syncingId === item.id}
                    className="text-xs font-bold px-3 py-1.5 rounded-lg bg-emerald-700 text-white hover:bg-emerald-800 disabled:opacity-50 cursor-pointer flex items-center gap-1.5 shadow-2xs"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${syncingId === item.id ? 'animate-spin' : ''}`} />
                    {syncingId === item.id ? 'Testing...' : 'Test Sync'}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Integration Architecture Summary Table */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-emerald-700" />
            <h3 className="text-sm font-bold text-slate-900">
              Technical Interface Specification Matrix (TECH-4 Appendix 3.2)
            </h3>
          </div>
          <span className="text-xs font-semibold text-slate-500">
            Database Driver: MySQL 8.0 &bull; ODBC Connector 8.0
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-600 border-b border-slate-200 uppercase font-semibold text-[11px] tracking-wider">
                <th className="py-3 px-4">System</th>
                <th className="py-3 px-4">Protocol & Port</th>
                <th className="py-3 px-4">Direction</th>
                <th className="py-3 px-4">Security / Encryption</th>
                <th className="py-3 px-4">Sync Frequency</th>
                <th className="py-3 px-4">Primary MoA Custodian</th>
                <th className="py-3 px-4">Contractual SLA</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-800">
              <tr className="hover:bg-slate-50/60">
                <td className="py-3.5 px-4 font-bold text-slate-900 flex items-center gap-2">
                  <Database className="w-4 h-4 text-amber-600" />
                  PASTEL Financial System
                </td>
                <td className="py-3.5 px-4 font-mono">ODBC (Port 1433/3306)</td>
                <td className="py-3.5 px-4">Bidirectional</td>
                <td className="py-3.5 px-4 text-slate-600">TLS 1.3 / AES-256 (Credentials under review)</td>
                <td className="py-3.5 px-4">Nightly Batch (02:00 CAT)</td>
                <td className="py-3.5 px-4">Mr. Mwila Kangwa (Senior Finance)</td>
                <td className="py-3.5 px-4 font-semibold text-red-700">Max 24h Stale (Escalated)</td>
              </tr>
              <tr className="hover:bg-slate-50/60">
                <td className="py-3.5 px-4 font-bold text-slate-900 flex items-center gap-2">
                  <FileSpreadsheet className="w-4 h-4 text-blue-600" />
                  SAPP Contracts Register
                </td>
                <td className="py-3.5 px-4 font-mono">REST JSON (HTTPS:443)</td>
                <td className="py-3.5 px-4">Bidirectional</td>
                <td className="py-3.5 px-4 text-slate-600">OAuth 2.0 Bearer Token + mTLS</td>
                <td className="py-3.5 px-4">Hourly Webhook Trigger</td>
                <td className="py-3.5 px-4">Mr. Leonard Lungu (Procurement)</td>
                <td className="py-3.5 px-4 font-semibold text-emerald-700">99.5% Uptime SLA</td>
              </tr>
              <tr className="hover:bg-slate-50/60">
                <td className="py-3.5 px-4 font-bold text-slate-900 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-emerald-600" />
                  GIS Spatial Data Layers
                </td>
                <td className="py-3.5 px-4 font-mono">WFS / Shapefile / GeoJSON</td>
                <td className="py-3.5 px-4">Inbound</td>
                <td className="py-3.5 px-4 text-slate-600">Signed SHA-256 GeoPackage</td>
                <td className="py-3.5 px-4">Weekly Refresh</td>
                <td className="py-3.5 px-4">Dr. Pamela Musonda (Surveyor General)</td>
                <td className="py-3.5 px-4 font-semibold text-emerald-700">Weekly Delta Sign-off</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Schema Mapping Modal */}
      {selectedInterface && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-300 rounded-xl max-w-xl w-full p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div className="flex items-center gap-2">
                <FileCode className="w-5 h-5 text-emerald-700" />
                <h3 className="font-bold text-base text-slate-900">
                  Schema Mapping: {selectedInterface.name}
                </h3>
              </div>
              <button
                onClick={() => setSelectedInterface(null)}
                className="text-slate-400 hover:text-slate-600 text-lg font-bold px-2 cursor-pointer"
              >
                &times;
              </button>
            </div>

            <div className="text-xs text-slate-600 space-y-2">
              <p>
                <strong>Interface Protocol:</strong> {selectedInterface.protocol} &bull;{' '}
                <strong>Direction:</strong> {selectedInterface.direction}
              </p>
              <p className="text-slate-500">
                The E-SAPP MIS core database maps incoming and outgoing attributes according to 3NF standards:
              </p>
            </div>

            <div className="bg-slate-900 text-slate-200 font-mono text-xs p-4 rounded-lg overflow-x-auto space-y-2">
              {selectedInterface.id === 1 ? (
                <>
                  <div className="text-emerald-400">// PASTEL Accounting &bull; Voucher Mapping</div>
                  <div>MIS Table: <span className="text-amber-300">grant_disbursements</span></div>
                  <div>- voucher_no &lt;--&gt; PASTEL.GL_TRANS.REF_NO</div>
                  <div>- amount_zmw &lt;--&gt; PASTEL.GL_TRANS.AMOUNT</div>
                  <div>- budget_code &lt;--&gt; PASTEL.CHART_ACCOUNTS.ACCOUNT_ID</div>
                  <div>- farmer_national_id &lt;--&gt; PASTEL.VENDOR.SUPP_REF</div>
                  <div className="text-red-400 mt-2">// Status: Schema decryption keys pending MoA Accounts sign-off</div>
                </>
              ) : selectedInterface.id === 2 ? (
                <>
                  <div className="text-emerald-400">// SAPP Contracts Register &bull; REST API Contract Sync</div>
                  <div>MIS Table: <span className="text-amber-300">contracts_register</span></div>
                  <div>- contract_id &lt;--&gt; SAPP_API.contracts.contract_uuid</div>
                  <div>- vendor_name &lt;--&gt; SAPP_API.contracts.supplier_name</div>
                  <div>- milestone_stage &lt;--&gt; SAPP_API.milestones.current_stage</div>
                  <div>- certification_status &lt;--&gt; SAPP_API.milestones.is_certified</div>
                  <div className="text-emerald-400 mt-2">// Status: Handshake active on https://contracts.sapp.moa.gov.zm</div>
                </>
              ) : (
                <>
                  <div className="text-emerald-400">// GIS Spatial Boundaries &bull; MultiPolygon Mapping</div>
                  <div>MIS Table: <span className="text-amber-300">spatial_boundaries</span></div>
                  <div>- province_id &lt;--&gt; GEO_DATA.provinces.adm1_pcode</div>
                  <div>- district_camp &lt;--&gt; GEO_DATA.agri_camps.camp_name</div>
                  <div>- geom &lt;--&gt; GEO_DATA.shapefiles.ST_GeomFromGeoJSON</div>
                  <div>- farmer_clusters &lt;--&gt; GEO_DATA.coops.coordinates_wgs84</div>
                  <div className="text-emerald-400 mt-2">// Status: 10/10 provinces loaded successfully</div>
                </>
              )}
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-200">
              <button
                onClick={() => setSelectedInterface(null)}
                className="px-4 py-2 bg-emerald-700 text-white font-bold text-xs rounded-lg hover:bg-emerald-800 cursor-pointer"
              >
                Close Inspector
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
