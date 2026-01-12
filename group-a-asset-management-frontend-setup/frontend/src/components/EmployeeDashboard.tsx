'use client';

import React, { useState, useEffect } from 'react';
import './EmployeeDashboard.css';

// --- SVG Icon Components ---
const IconUser = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg>;
const IconAssets = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" /></svg>;
const IconTickets = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-1.5h5.25m-5.25 0h3m-3 0h-3m2.25-4.125c0-1.036.84-1.875 1.875-1.875h.375c1.036 0 1.875.84 1.875 1.875v.375c0 1.036-.84 1.875-1.875 1.875h-.375A1.875 1.875 0 016 13.875v-.375z" /></svg>;
const IconActions = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" /></svg>;
const IconLaptop = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25A2.25 2.25 0 015.25 3h13.5A2.25 2.25 0 0121 5.25z" /></svg>;
const IconCharger = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M11.25 4.5l7.5 7.5-7.5 7.5M11.25 12h9" /></svg>;
const IconMouse = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zm-7.518-.267A8.25 8.25 0 1120.25 10.5M8.288 14.212A5.25 5.25 0 1117.25 10.5" /></svg>;
const IconHeadset = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m12 0-3-3m-3 3l-3-3m-3.75 6.75h10.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 6.75v6.75a2.25 2.25 0 002.25 2.25z" /></svg>;
const IconClose = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>;

// --- Type Definitions ---
interface AssetDetail { label: string; value: string; }
interface Asset { icon: React.ReactNode; title: string; subtitle: string; tag: string; details: AssetDetail[]; }
interface AssetDetailModalProps { asset: Asset; onClose: () => void; }

// --- Main Dashboard Component ---
export default function EmployeeDashboard() {
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);

  useEffect(() => {
    if (selectedAsset) { document.body.classList.add('modal-open'); } 
    else { document.body.classList.remove('modal-open'); }
    return () => document.body.classList.remove('modal-open');
  }, [selectedAsset]);

  const employeeData = {
    name: 'Ritika Pasari', role: 'Trainee Engineer', initials: 'RP', status: 'Active',
    details: [
        { label: "DAS ID", value: "W199616" },
        { label: "Employee ID", value: "EMP-10482" },
        { label: "Email", value: "ritika.pasari@worldline.com" },
        { label: "Location", value: "Pune WGS – Hinjewadi" },
        { label: "Manager", value: "Anandan S." },
    ]
  };

  const assets: Asset[] = [
    { icon: <IconLaptop />, title: "Laptop", subtitle: "Dell Latitude 5510", tag: "DSWP8D4", details: [{ label: "Processor", value: "Intel Core i5 (10th Gen)" }, { label: "RAM", value: "16 GB DDR4" }, { label: "Storage", value: "512 GB NVMe SSD" }, { label: "OS", value: "Windows 11 Pro" }, { label: "Warranty End", value: "August 2028" }, { label: "Status", value: "Working" },] },
    { icon: <IconCharger />, title: "Laptop Charger", subtitle: "Dell 65W Adapter", tag: "CN0FJ3R5", details: [{ label: "Type", value: "USB-C" }, { label: "Power", value: "65 Watt" }, { label: "Serial", value: "CN0FJ3R5T600CP75URA02" }, { label: "Status", value: "Issued" },] },
    { icon: <IconMouse />, title: "Wired Mouse", subtitle: "Dell Optical Mouse", tag: "WM-7712-DL", details: [{ label: "Connection", value: "USB-A" }, { label: "Model", value: "MS116" }, { label: "Status", value: "Issued" },] },
    { icon: <IconHeadset />, title: "Headset", subtitle: "Logitech H390", tag: "HS-5589-LG", details: [{ label: "Connection", value: "USB-A" }, { label: "Features", value: "Noise-canceling mic" }, { label: "Status", value: "Issued" },] },
  ];

  const tickets = [
    { id: "TCK-1024", issue: "Laptop overheating issue", asset: "Dell Latitude 5510", status: "In Progress", date: "Jan 06, 2026" },
    { id: "TCK-0987", issue: "Battery draining fast", asset: "Dell Latitude 5510", status: "Resolved", date: "Dec 10, 2025" },
    { id: "TCK-0942", issue: "Headset mic not working", asset: "Headset", status: "Closed", date: "Nov 22, 2025" },
  ];

  return (
    <div className="employee-dashboard">
      <header className="dashboard-header">
        <h1>Dashboard</h1>
        <p>Welcome back, {employeeData.name}. Here's your asset and support overview.</p>
      </header>

      <main className="dashboard-layout">
        <div className="main-column">
          {/* --- Profile Card --- */}
          <div className="card profile-card">
            <div className="card-header"><div className="card-header-icon"><IconUser /></div><h2>Employee Profile</h2></div>
            <div className="card-body">
              <div className="profile-info">
                <div className="profile-avatar">{employeeData.initials}</div>
                <h3>{employeeData.name}</h3>
                <p>{employeeData.role}</p>
              </div>
              <div className="profile-details">
                {employeeData.details.map(item => (<div className="detail-item" key={item.label}><span className="detail-label">{item.label}</span><span className="detail-value">{item.value}</span></div>))}
                <div className="detail-item"><span className="detail-label">Status</span><span className="detail-value"><span className="status-badge active">{employeeData.status}</span></span></div>
              </div>
            </div>
          </div>

          {/* --- ADDED: My Support Tickets Card --- */}
          <div className="card tickets-card">
            <div className="card-header"><div className="card-header-icon"><IconTickets /></div><h2>My Support Tickets</h2></div>
            <div className="card-body" style={{ padding: 0 }}>
              <table className="tickets-table">
                <thead>
                  <tr>
                    <th>Ticket ID</th>
                    <th>Issue</th>
                    <th>Status</th>
                    <th>Last Updated</th>
                  </tr>
                </thead>
                <tbody>
                  {tickets.map(ticket => (
                    <tr key={ticket.id}>
                      <td><strong>{ticket.id}</strong></td>
                      <td>{ticket.issue}</td>
                      <td>
                        <span className={`ticket-status ${ticket.status.toLowerCase().replace(' ', '-')}`}>
                          {ticket.status}
                        </span>
                      </td>
                      <td>{ticket.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="sidebar-column">
          {/* --- Assigned Assets Card --- */}
          <div className="card assets-card">
            <div className="card-header"><div className="card-header-icon"><IconAssets /></div><h2>My Assigned Assets</h2></div>
            <div className="card-body">
              <div className="assets-grid">
                {assets.map(asset => (<div className="asset-item" key={asset.tag} onClick={() => setSelectedAsset(asset)}><div className="asset-icon-wrapper">{asset.icon}</div><h4>{asset.title}</h4><p>{asset.subtitle}</p><div className="asset-tag">{asset.tag}</div></div>))}
              </div>
            </div>
          </div>

          {/* --- Quick Actions Card --- */}
          <div className="card quick-actions-card">
            <div className="card-header"><div className="card-header-icon"><IconActions /></div><h2>Quick Actions</h2></div>
            <div className="card-body">
              <div className="actions-list">
                <button className="action-button"><IconTickets /> Raise Support Ticket</button>
                <button className="action-button"><IconAssets /> Report Asset Issue</button>
                <button className="action-button"><IconHeadset /> Request Replacement</button>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      {selectedAsset && <AssetDetailModal asset={selectedAsset} onClose={() => setSelectedAsset(null)} />}
    </div>
  );
}

// --- Asset Detail Modal Component ---
function AssetDetailModal({ asset, onClose }: AssetDetailModalProps) {
  const handleContentClick = (e: React.MouseEvent) => e.stopPropagation();

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={handleContentClick}>
        <div className="modal-header"><h3>Asset Details</h3><button className="modal-close-btn" onClick={onClose} aria-label="Close modal"><IconClose /></button></div>
        <div className="modal-body">
          <div className="asset-main-info">
            <div className="modal-asset-icon">{asset.icon}</div>
            <div><h4>{asset.title}</h4><p>{asset.subtitle}</p><div className="asset-tag" style={{marginTop: '0.5rem'}}>{asset.tag}</div></div>
          </div>
          <ul className="asset-spec-list">
            {asset.details.map(detail => (<li className="asset-spec-item" key={detail.label}><span className="asset-spec-label">{detail.label}</span><span className="asset-spec-value">{detail.value}</span></li>))}
          </ul>
        </div>
      </div>
    </div>
  );
}


















///////----------best

// 'use client';

// import React from 'react';
// import './EmployeeDashboard.css';

// // --- SVG Icon Components for a professional look ---
// const IconUser = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg>;
// const IconAssets = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" /></svg>;
// const IconTickets = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-1.5h5.25m-5.25 0h3m-3 0h-3m2.25-4.125c0-1.036.84-1.875 1.875-1.875h.375c1.036 0 1.875.84 1.875 1.875v.375c0 1.036-.84 1.875-1.875 1.875h-.375A1.875 1.875 0 016 13.875v-.375z" /></svg>;
// const IconActions = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" /></svg>;
// const IconLaptop = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25A2.25 2.25 0 015.25 3h13.5A2.25 2.25 0 0121 5.25z" /></svg>;
// const IconDevice = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" /></svg>;


// export default function EmployeeDashboard() {
//   const employeeData = {
//     name: 'Ritika Pasari',
//     role: 'Trainee Engineer',
//     initials: 'RP',
//     status: 'Active',
//     details: [
//         { label: "DAS ID", value: "W199616" },
//         { label: "Employee ID", value: "EMP-10482" },
//         { label: "Email", value: "ritika.pasari@worldline.com" },
//         { label: "Location", value: "Pune WGS – Hinjewadi" },
//         { label: "Manager", value: "Anandan S." },
//     ]
//   };

//   const assets = [
//     { icon: <IconLaptop />, title: "Laptop", subtitle: "Dell Latitude 5510", tag: "DSWP8D4" },
//     { icon: <IconDevice />, title: "Charger", subtitle: "Dell Compatible", tag: "CN0FJ3R5" },
//     { icon: <IconDevice />, title: "Wired Mouse", subtitle: "Dell USB Mouse", tag: "WM-7712-DL" },
//     { icon: <IconDevice />, title: "Headset", subtitle: "Logitech Wired", tag: "HS-5589-LG" },
//   ];

//   const tickets = [
//     { id: "TCK-1024", issue: "Laptop overheating issue", asset: "Dell Latitude 5510", status: "In Progress", date: "Jan 06, 2026" },
//     { id: "TCK-0987", issue: "Battery draining fast", asset: "Dell Latitude 5510", status: "Resolved", date: "Dec 10, 2025" },
//     { id: "TCK-0942", issue: "Headset mic not working", asset: "Headset", status: "Closed", date: "Nov 22, 2025" },
//   ];

//   return (
//     <div className="employee-dashboard">
//       <header className="dashboard-header">
//         <h1>Dashboard</h1>
//         <p>Welcome back, {employeeData.name}. Here's your asset and support overview.</p>
//       </header>

//       <main className="dashboard-layout">

//         {/* --- Profile Card --- */}
//         <div className="card profile-card">
//           <div className="card-header">
//             <div className="card-header-icon"><IconUser /></div>
//             <h2>Employee Profile</h2>
//           </div>
//           <div className="card-body">
//             <div className="profile-info">
//               <div className="profile-avatar">{employeeData.initials}</div>
//               <h3>{employeeData.name}</h3>
//               <p>{employeeData.role}</p>
//             </div>
//             <div className="profile-details">
//                 {employeeData.details.map(item => (
//                     <div className="detail-item" key={item.label}>
//                         <span className="detail-label">{item.label}</span>
//                         <span className="detail-value">{item.value}</span>
//                     </div>
//                 ))}
//                  <div className="detail-item">
//                     <span className="detail-label">Status</span>
//                     <span className="detail-value">
//                         <span className="status-badge active">{employeeData.status}</span>
//                     </span>
//                 </div>
//             </div>
//           </div>
//         </div>

//         {/* --- Assigned Assets Card --- */}
//         <div className="card assets-card">
//           <div className="card-header">
//             <div className="card-header-icon"><IconAssets /></div>
//             <h2>My Assigned Assets</h2>
//           </div>
//           <div className="card-body">
//             <div className="assets-grid">
//               {assets.map(asset => (
//                 <div className="asset-item" key={asset.tag}>
//                   <div className="asset-icon-wrapper">{asset.icon}</div>
//                   <h4>{asset.title}</h4>
//                   <p>{asset.subtitle}</p>
//                   <div className="asset-tag">{asset.tag}</div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* --- Tickets and Actions Grid --- */}
//         <div className="tickets-actions-grid">
//             {/* --- Tickets Card --- */}
//             <div className="card tickets-card">
//                 <div className="card-header">
//                     <div className="card-header-icon"><IconTickets /></div>
//                     <h2>My Support Tickets</h2>
//                 </div>
//                 <div className="card-body" style={{padding: 0}}>
//                     <table className="tickets-table">
//                         <thead>
//                             <tr>
//                                 <th>Ticket ID</th>
//                                 <th>Issue</th>
//                                 <th>Status</th>
//                                 <th>Date</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {tickets.map(ticket => (
//                                 <tr key={ticket.id}>
//                                     <td><strong>{ticket.id}</strong></td>
//                                     <td>{ticket.issue}</td>
//                                     <td>
//                                         <span className={`ticket-status ${ticket.status.toLowerCase().replace(' ', '-')}`}>
//                                             {ticket.status}
//                                         </span>
//                                     </td>
//                                     <td>{ticket.date}</td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             </div>

//             {/* --- Quick Actions Card --- */}
//             <div className="card quick-actions-card">
//                 <div className="card-header">
//                     <div className="card-header-icon"><IconActions /></div>
//                     <h2>Quick Actions</h2>
//                 </div>
//                 <div className="card-body">
//                     <div className="actions-list">
//                         <button className="action-button"><IconTickets /> Raise Support Ticket</button>
//                         <button className="action-button"><IconAssets /> Report Asset Issue</button>
//                         <button className="action-button"><IconDevice /> Request Replacement</button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//       </main>
//     </div>
//   );
// }







//-----------------------------------






// import './EmployeeDashboard.css';

// export default function EmployeeDashboard() {
//   const employee = {
//     name: 'Ritika Pasari',
//     role: 'Trainee Engineer',
//     dasId: 'W1AABBCC',
//     email: 'ritika.pasari@worldline.com',
//     phone: '+91 9XXXX XXXXX',
//     location: 'Pune WGS - Hinjewadi',
//     manager: 'John Manager',
//     doj: '13 Aug 2025',
//   };

//   const assets = [
//     {
//       name: 'Laptop',
//       make: 'Dell',
//       model: 'Latitude 5510',
//       tag: 'DSWP8D4',
//       status: 'Working',
//     },
//     {
//       name: 'Charger',
//       tag: 'CN0FJ3R5T600CP75URA02',
//       status: 'Issued',
//     },
//     {
//       name: 'Wired Mouse',
//       status: 'Issued',
//     },
//     {
//       name: 'Headset',
//       status: 'Issued',
//     },
//   ];

//   const tickets = [
//     {
//       id: 'TCK-1024',
//       title: 'Laptop overheating issue',
//       asset: 'Dell Latitude 5510',
//       status: 'In Progress',
//       priority: 'Medium',
//       createdOn: '05 Jan 2026',
//     },
//   ];

//   return (
//     <div className="employee-dashboard">
//       {/* PROFILE */}
//       <section className="profile-card">
//         <h3>Employee Profile</h3>
//         <ProfileRow label="Name" value={employee.name} />
//         <ProfileRow label="Role" value={employee.role} />
//         <ProfileRow label="DAS ID" value={employee.dasId} />
//         <ProfileRow label="Email" value={employee.email} />
//         <ProfileRow label="Phone" value={employee.phone} />
//         <ProfileRow label="Location" value={employee.location} />
//         <ProfileRow label="Date of Joining" value={employee.doj} />
//         <ProfileRow label="Manager" value={employee.manager} />
//       </section>

//       {/* ASSETS */}
//       <section className="assets-section">
//         <h3>My Assigned Assets</h3>

//         <div className="asset-grid">
//           {assets.map((a, i) => (
//             <div key={i} className="asset-card">
//               <div className="asset-title">{a.name}</div>
//               {a.make && <p>{a.make} • {a.model}</p>}
//               {a.tag && <p className="muted">Tag: {a.tag}</p>}
//               <span className={`badge ${a.status === 'Working' ? 'success' : 'info'}`}>
//                 {a.status}
//               </span>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* TICKETS */}
//       <section className="tickets-section">
//         <h3>My Support Tickets</h3>

//         {tickets.map(ticket => (
//           <div key={ticket.id} className="ticket-card">
//             <div className="ticket-header">
//               <strong>{ticket.title}</strong>
//               <span className="badge warning">{ticket.status}</span>
//             </div>

//             <div className="ticket-body">
//               <p><b>Ticket ID:</b> {ticket.id}</p>
//               <p><b>Asset:</b> {ticket.asset}</p>
//               <p><b>Priority:</b> {ticket.priority}</p>
//               <p><b>Created On:</b> {ticket.createdOn}</p>
//             </div>
//           </div>
//         ))}
//       </section>
//     </div>
//   );
// }

// function ProfileRow({ label, value }: { label: string; value: string }) {
//   return (
//     <div className="profile-row">
//       <span>{label}</span>
//       <strong>{value}</strong>
//     </div>
//   );
// }
