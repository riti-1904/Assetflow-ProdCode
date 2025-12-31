-- =========================================
-- AssetFlow Chatbot Knowledge Base Inserts
-- =========================================

use asset_flow;

INSERT INTO ChatKnowledgeBase (QuestionPattern, Answer, Intent)
VALUES
-- Identity & Project Basics
('who are you',
 'I am AssetBot, the intelligent virtual assistant for the AssetFlow platform, designed to help users understand asset management processes.',
 'bot_identity'),

('what is assetflow',
 'AssetFlow is an enterprise asset and inventory management system that tracks assets from procurement to disposal.',
 'project_name'),

('what problem does assetflow solve',
 'AssetFlow solves the problem of fragmented asset tracking by providing a centralized system for lifecycle management, movement tracking, and maintenance.',
 'problem_statement'),

('explain this project',
 'AssetFlow digitizes and centralizes asset tracking to improve visibility, accountability, and operational efficiency across the organization.',
 'project_overview'),

('who developed this project',
 'AssetFlow was developed as part of a training project by a student development team using modern enterprise technologies.',
 'project_team'),

-- Asset Lifecycle
('what is asset lifecycle',
 'The asset lifecycle in AssetFlow includes procurement, allocation, usage, maintenance, repair, and final retirement or disposal.',
 'asset_lifecycle'),

('what are asset lifecycle states',
 'Asset lifecycle states include Procured, In Use, Under Maintenance, Repaired, and Decommissioned.',
 'asset_lifecycle_states'),

('what is asset procurement',
 'Asset procurement refers to purchasing and registering new assets into the system with vendor and cost details.',
 'asset_procurement'),

('what is asset allocation',
 'Asset allocation means assigning an asset to a specific employee, department, or location.',
 'asset_allocation'),

('what is asset transfer',
 'Asset transfer allows movement of an asset between users, departments, or locations while maintaining history.',
 'asset_transfer'),

('what is asset retirement',
 'Asset retirement means permanently removing an asset from active use due to damage, obsolescence, or end of life.',
 'asset_retirement'),

-- Asset Management Features
('what details are stored for an asset',
 'AssetFlow stores asset tag, serial number, category, model, vendor, purchase date, cost, warranty, and lifecycle status.',
 'asset_details'),

('does assetflow support asset categories',
 'Yes, AssetFlow supports asset categorization such as hardware, software, peripherals, and fleet assets.',
 'asset_categories'),

('can assets be imported in bulk',
 'Yes, AssetFlow supports bulk import and export of assets using CSV or Excel files.',
 'bulk_import'),

('does assetflow support barcode or rfid',
 'Yes, AssetFlow supports barcode and RFID scanning for faster asset identification.',
 'barcode_rfid'),

-- Inventory & Movement
('what is asset check in',
 'Asset check-in records when an asset is returned to inventory or a storage location.',
 'asset_checkin'),

('what is asset check out',
 'Asset check-out records when an asset is assigned or issued to a user or department.',
 'asset_checkout'),

('is asset movement history tracked',
 'Yes, AssetFlow maintains a complete movement history with timestamps and user details.',
 'movement_history'),

-- Fault & Maintenance
('what is fault management',
 'Fault management allows users to report asset issues and track them until resolution.',
 'fault_management'),

('what are fault statuses',
 'Fault statuses include New, Assigned, In Progress, and Resolved.',
 'fault_status'),

('who can report faults',
 'Employees, asset managers, and technicians can report faults in AssetFlow.',
 'fault_reporting'),

('what is asset maintenance',
 'Asset maintenance involves inspection, servicing, and repair to keep assets operational.',
 'asset_maintenance'),

('does assetflow support maintenance scheduling',
 'Yes, AssetFlow provides maintenance scheduling with technician assignment and reminders.',
 'maintenance_scheduling'),

-- Users & Security
('how does user authentication work',
 'AssetFlow uses Azure Active Directory Single Sign-On for secure user authentication.',
 'authentication'),

('what roles are available in assetflow',
 'AssetFlow supports roles such as Admin, Asset Manager, Technician, and Employee.',
 'user_roles'),

('what is role based access control',
 'Role-based access control ensures users can only access features permitted by their role.',
 'rbac'),

('are user actions audited',
 'Yes, AssetFlow maintains audit logs for asset changes, movements, and user actions.',
 'audit_logs'),

-- Notifications & Integrations
('does assetflow send notifications',
 'Yes, AssetFlow sends email and in-app notifications for asset movements, faults, and maintenance events.',
 'notifications'),

('what are webhooks',
 'WebHooks allow AssetFlow to notify external systems about asset events in real time.',
 'webhooks'),

('can assetflow integrate with other systems',
 'Yes, AssetFlow can integrate with ITSM, ERP, and procurement systems using APIs and WebHooks.',
 'integrations'),

-- AI & Chatbot
('does assetflow have ai features',
 'AssetFlow includes basic AI features such as fault routing suggestions and a chatbot for FAQs.',
 'ai_features'),

('what can the chatbot do',
 'The chatbot answers common questions, explains features, and helps users navigate the AssetFlow system.',
 'chatbot_capabilities'),

-- Reporting & Analytics
('what reports are available',
 'AssetFlow provides reports on asset counts, lifecycle aging, maintenance SLAs, and fault trends.',
 'reporting'),

('can reports be exported',
 'Yes, reports can be exported in PDF or CSV format.',
 'export_reports'),

-- Technical Architecture
('what technology is used in backend',
 'The backend of AssetFlow is built using .NET Core microservices.',
 'backend_tech'),

('what database is used',
 'AssetFlow uses Microsoft SQL Server as its primary relational database.',
 'database'),

('what frontend technology is used',
 'The frontend of AssetFlow is developed using React with TypeScript.',
 'frontend_tech'),

('is assetflow containerized',
 'Yes, AssetFlow services are containerized using Docker.',
 'docker_support');

-- =====================================================
-- AssetFlow Project – Developers & Mentors Knowledge
-- =====================================================

INSERT INTO ChatKnowledgeBase (QuestionPattern, Answer, Intent)
VALUES

-- =====================================================
-- PROJECT DEVELOPERS (GENERAL)
-- =====================================================
('who are the developers of assetflow',
 'AssetFlow was developed by Ritika Pasari, Himanshu Gupta, Sri Ranjini Azhagararajan, Monisha Suresh, and Monish Anand, all working as Automation Engineers.',
 'project_developers'),

('who developed this project',
 'The AssetFlow project was developed by a team of Automation Engineers: Ritika Pasari, Himanshu Gupta, Sri Ranjini Azhagararajan, Monisha Suresh, and Monish Anand.',
 'project_developers'),

('tell me about the assetflow developers',
 'The AssetFlow development team consists of five Automation Engineers who collaborated to build an end-to-end asset management system.',
 'project_developers'),

-- =====================================================
-- INDIVIDUAL DEVELOPERS
-- =====================================================

-- Ritika Pasari
('who is ritika pasari',
 'Ritika Pasari is one of the core developers of the AssetFlow project and works as an Automation Engineer.',
 'developer_identity'),

('tell me about ritika pasari',
 'Ritika Pasari is an Automation Engineer who contributed to the design and development of the AssetFlow system.',
 'developer_background'),

('what is ritika pasari role in assetflow',
 'Ritika Pasari contributed to AssetFlow as a project developer with expertise in automation engineering.',
 'developer_role'),

-- Himanshu Gupta
('who is himanshu gupta',
 'Himanshu Gupta is one of the developers of AssetFlow and works as an Automation Engineer.',
 'developer_identity'),

('tell me about himanshu gupta',
 'Himanshu Gupta is an Automation Engineer who played a key role in building the AssetFlow project.',
 'developer_background'),

('what is himanshu gupta role in this project',
 'Himanshu Gupta served as a developer in the AssetFlow project, focusing on automation-driven implementation.',
 'developer_role'),

-- Sri Ranjini Azhagararajan
('who is sri ranjini azhagararajan',
 'Sri Ranjini Azhagararajan is one of the developers of AssetFlow and works as an Automation Engineer.',
 'developer_identity'),

('tell me about sri ranjini',
 'Sri Ranjini Azhagararajan is an Automation Engineer and a contributor to the AssetFlow asset management system.',
 'developer_background'),

('what is sri ranjini contribution',
 'Sri Ranjini Azhagararajan contributed to AssetFlow as part of the core automation engineering team.',
 'developer_role'),

-- Monisha Suresh
('who is monisha suresh',
 'Monisha Suresh is one of the developers of AssetFlow and works as an Automation Engineer.',
 'developer_identity'),

('tell me about monisha suresh',
 'Monisha Suresh is an Automation Engineer who contributed to the development of AssetFlow.',
 'developer_background'),

('what is monisha suresh role',
 'Monisha Suresh played a role in developing AssetFlow as part of the automation engineering team.',
 'developer_role'),

-- Monish Anand
('who is monish anand',
 'Monish Anand is one of the developers of AssetFlow and works as an Automation Engineer.',
 'developer_identity'),

('tell me about monish anand',
 'Monish Anand is an Automation Engineer and a developer involved in the AssetFlow project.',
 'developer_background'),

('what is monish anand role',
 'Monish Anand contributed to AssetFlow as a project developer specializing in automation.',
 'developer_role'),

-- =====================================================
-- PROJECT MENTORS / GUIDES (GENERAL)
-- =====================================================
('who are the mentors of assetflow',
 'The AssetFlow project was guided by mentors Vighnesh V, Anandan Subramanian, Sharanya Krishnamurthy, S Lakshminarayanan Sriram, and Manojkumar Sanjeevi.',
 'project_mentors'),

('who guided this project',
 'AssetFlow was developed under the guidance of experienced mentors and stakeholders from the organization.',
 'project_mentors'),

('who are the project stakeholders',
 'The project stakeholders and mentors include Vighnesh V, Anandan Subramanian, Sharanya Krishnamurthy, S Lakshminarayanan Sriram, and Manojkumar Sanjeevi.',
 'project_mentors'),

-- =====================================================
-- INDIVIDUAL MENTORS / GUIDES
-- =====================================================

-- Anandan Subramanian
('who is anandan',
 'Anandan Subramanian is one of the mentors and key stakeholders who guided the AssetFlow project.',
 'mentor_identity'),

('who is anandan subramanian',
 'Anandan Subramanian served as a mentor and project stakeholder for AssetFlow.',
 'mentor_identity'),

('tell me about anandan',
 'Anandan Subramanian provided mentorship and guidance throughout the AssetFlow project.',
 'mentor_background'),

-- Vighnesh V
('who is vighnesh',
 'Vighnesh V is a mentor and stakeholder who guided the AssetFlow project.',
 'mentor_identity'),

('who is vighnesh v',
 'Vighnesh V played a mentoring role in guiding the AssetFlow development team.',
 'mentor_identity'),

-- Sharanya Krishnamurthy
('who is sharanya',
 'Sharanya Krishnamurthy is a mentor and project stakeholder for AssetFlow.',
 'mentor_identity'),

('who is sharanya krishnamurthy',
 'Sharanya Krishnamurthy guided the AssetFlow team as a project mentor.',
 'mentor_identity'),

-- S Lakshminarayanan Sriram
('who is lakshminarayanan sriram',
 'S Lakshminarayanan Sriram is a mentor and stakeholder for the AssetFlow project.',
 'mentor_identity'),

('who is sriram',
 'S Lakshminarayanan Sriram served as a mentor and provided guidance for AssetFlow.',
 'mentor_identity'),

-- Manojkumar Sanjeevi
('who is manojkumar sanjeevi',
 'Manojkumar Sanjeevi is a mentor and stakeholder who guided the AssetFlow project.',
 'mentor_identity'),

('who is manojkumar',
 'Manojkumar Sanjeevi supported the AssetFlow team as a project mentor.',
 'mentor_identity');


SELECT * from ChatknowledgeBase;