const Datastore = require('nedb');
const db = new Datastore({ filename: '../db/opportunities.db', autoload: true });

// Define your categories and opportunities data
const categories = [
    {
        
        type: 'category',
        category_id: 'C001',
        name: 'Skill Development',
        description: 'Category for Mock Interviews',
    },
    {   
        type: 'category',
        category_id: 'C002',
        name: ' Career Advice',
        description: 'Category for Review Interviews',
    },
    {
        type: 'category',
        category_id: 'C003',
        name: 'Resume Review',
        description: 'Category for Resume Review',
    },
    {
        type: 'category',
        category_id: 'C004',
        name: 'Mock Interview',
        description: 'Category for Resume Review',
    },
    {
        type: 'category',
        category_id: 'C005',
        name: 'Well-being',
        description: 'Category for Resume Review',
    }
];

const opportunities = [
    {
        type: 'opportunity',
        category_id: 'C001', // Use the corresponding category's ID
        title: 'Leadership Skills Training',
        description: 'Students can find mentors who specialize in leadership development. These mentors can provide guidance on developing leadership skills, managing teams, and leading with confidence.',
        date: null,
        time: null,
    },
    {
        type: 'opportunity',
        category_id: 'C001',
        title: 'Communication and Presentation Skills',
        description: 'Mentors will assist students in improving their communication and presentation abilities, focusing on clarity, persuasion, and effective delivery of ideas.',
        date: null,
        time: null,
    },
    {
        type: 'opportunity',
        category_id: 'C001',
        title: 'Project Management Coaching',
        description: 'For students interested in project management, mentors can provide coaching on project planning, organization, and execution, helping them develop essential skills for this field.',
        date: null,
        time: null,
    
    },
    {
        type: 'opportunity',
        category_id: 'C001',
        title: 'Coding and Programming Practice',
        description: 'Students pursuing careers in software development can connect with mentors who can guide them through coding challenges, best practices, and programming language-specific training.',
        date: null,
        time: null,
    },

    {
        type: 'opportunity',
        category_id: 'C001',
        title: 'Data Analysis and Analytics Skills',
        description: 'Mentors will assist students in developing data analysis and analytics skills. This includes working with data tools, statistical analysis, and data visualization techniques.',
        date: null,
        time: null,
    },
    {
        type: 'opportunity',
        category_id: 'C001',
        title: 'Soft Skills Development',
        description: 'Mentors will help students refine soft skills such as teamwork, adaptability, problem-solving, and time management, which are valuable in any career.',
        date: null,
        time: null,   
    },



    {
        type: 'opportunity',
        category_id: 'C002',
        title: 'Career Exploration',
        description: ' Provide students with the opportunity to connect with experienced mentors who can help them explore various career paths, industries, and job opportunities. Mentors will offer insights, advice, and guidance on how to navigate the complex world of careers.',
        date: null,
        time: null, 
    },
    {
        type: 'opportunity',
        category_id: 'C002',
        title: 'Job Search Strategy',
        description: 'Students can seek mentors to help them develop effective job search strategies. Mentors will assist in creating a tailored job search plan, identifying job boards, and networking to increase the chances of landing the right job.',
        date: null,
        time: null,  
    },
    {
        type: 'opportunity',
        category_id: 'C002',
        title: 'Career Transition Support',
        description: 'This opportunity allows students to connect with mentors who can guide them through career transitions, such as switching industries or roles. Mentors can provide advice on updating resumes, acquiring new skills, and making a successful transition.',
        date: null,
        time: null,
    },
    {
        type: 'opportunity',
        category_id: 'C002',
        title: 'Personal Branding',
        description: 'Students can work with mentors to build their personal brand. This includes creating a professional online presence, optimizing LinkedIn profiles, and enhancing their online reputation to attract potential employers or clients.',
        date: null,
        time: null, 
    },
    {
        type: 'opportunity',
        category_id: 'C002',
        title: 'Networking and Connections',
        description: 'Enable students to find mentors who can help them build a professional network. Mentors can share networking tips, introduce students to key industry contacts, and guide them in fostering meaningful connections.',
        date: null,
        time: null,
    },
    {
        type: 'opportunity',
        category_id: 'C002',
        title: 'Career Goal Setting',
        description: 'Students can seek mentors to help them set and achieve career goals. Mentors can assist in defining clear objectives, creating action plans, and tracking progress toward long-term career success.',
        date: null,
        time: null,
    },
    



    {
        type: 'opportunity',
        category_id: 'C003',
        title: 'Resume Enhancement',
        description: 'Students can connect with mentors who specialize in resume writing. Mentors will provide personalized feedback and suggestions to improve the content, format, and overall effectiveness of the students', 
        date: null,
        time: null,
    },
    {
        type: 'opportunity',
        category_id: 'C003',
        title: 'Cover Letter Assistance',
        description: 'This opportunity allows students to get help from mentors in crafting compelling cover letters. Mentors will offer guidance on tailoring cover letters for specific job applications and making them stand out.',
        date: null,
        time: null,
    },
    {
        type: 'opportunity',
        category_id: 'C003',
        title: 'ATS Optimization',
        description: ' Mentors will assist students in optimizing their resumes for Applicant Tracking Systems (ATS). This includes keyword optimization and formatting recommendations to ensure that resumes pass through ATS filters.',
        date: null,
        time: null,
    },
    {
        type: 'opportunity',
        category_id: 'C003',
        title: 'Portfolio Review',
        description: 'Students seeking careers in creative fields can connect with mentors for portfolio reviews. Mentors can provide constructive feedback on the organization, presentation, and content of portfolios.',
        date: null,
        time: null,
    },
    {
        type: 'opportunity',
        category_id: 'C003',
        title: ' LinkedIn Profile Review',
        description: 'Students can have their LinkedIn profiles reviewed by mentors to enhance their professional online presence. Mentors can suggest improvements in profile completeness, content, and networking strategies.',
        date: null,
        time: null,
    },
    {
        type: 'opportunity',
        category_id: 'C003',
        title: ' Personal Branding through Documents',
        description: 'Mentors can help students understand how to use their resumes and cover letters as tools for personal branding. They can guide students on how to present themselves authentically and effectively through these documents.',
        date: null,
        time: null,
    },



  // Mock Interview

    {
        type: 'opportunity',
        category_id: 'C004',
        title: ' Interview Preparation',
        description: 'Students can practice and prepare for job interviews with experienced mentors who will conduct mock interviews and provide constructive feedback on performance.',
        date: null,
        time: null,
    },
    {
        type: 'opportunity',
        category_id: 'C004',
        title: '  Behavioral Interview Coaching',
        description: ' Mentors will specialize in coaching students for behavioral interviews. They can provide tips and guidance on answering common behavioral questions with confidence and clarity.',
        date: null,
        time: null,
    },
    {
        type: 'opportunity',
        category_id: 'C004',
        title: ' Technical Interview Simulation',
        description: 'For students pursuing technical careers, mentors can simulate technical interviews relevant to their field, helping them prepare for coding challenges, technical questions, and problem-solving scenarios.',
        date: null,
        time: null,
    },
    {
        type: 'opportunity',
        category_id: 'C004',
        title: 'Presentation Skills',
        description: 'Students can connect with mentors who can improve their presentation and communication skills. This can be especially useful for roles that require public speaking or client interactions.',
        date: null,
        time: null,
    },
    {
        type: 'opportunity',
        category_id: 'C004',
        title: 'Case Interview Practice',
        description: 'Mentors can assist students interested in consulting or related fields by conducting case interview practice sessions. They can guide students in solving business cases and provide valuable feedback.',
        date: null,
        time: null,
    },
    {
        type: 'opportunity',
        category_id: 'C004',
        title: 'Confidence Building',
        description: 'Some students may need confidence-building support. Mentors can help students boost their self-assurance, body language, and overall presence during interviews to make a lasting impression.',
        date: null,
        time: null,
    },



    {
        type: 'opportunity',
        category_id: 'C005',
        title: 'Stress Management and Resilience Building',
        description: 'Students can connect with mentors who can provide guidance on managing stress, building resilience, and maintaining mental well-being in a challenging academic and professional environment.',
        date: null,
        time: null,
    },
    {
        type: 'opportunity',
        category_id: 'C005',
        title: 'Mindfulness and Meditation',
        description: 'Mentors can offer sessions on mindfulness and meditation to help students reduce anxiety, improve focus, and enhance their overall emotional well-being.',
        date: null,
        time: null,
    },
    {
        type: 'opportunity',
        category_id: 'C005',
        title: 'Nutrition and Wellness Coaching',
        description: 'Students can find mentors who specialize in nutrition and wellness. These mentors can provide advice on maintaining a healthy lifestyle, balanced diet, and physical well-being.',
        date: null,
        time: null,
    },
    {
        type: 'opportunity',
        category_id: 'C005',
        title: 'Time Management and Work-Life Balance',
        description: 'Mentors can guide students in effective time management and achieving work-life balance, which is crucial for their overall well-being and success.',
        date: null,
        time: null,
    },
    {
        type: 'opportunity',
        category_id: 'C005',
        title: 'Peer Support and Peer Mentoring',
        description: 'Facilitate peer mentoring for emotional support, connecting students with peers who can share experiences and provide support during challenging times.',
        date: null,
        time: null,
    },
    {
        type: 'opportunity',
        category_id: 'C005',
        title: 'Mental Health Resources',
        description: 'Provide access to mental health resources, including articles, videos, and guides, to help students learn about mental health and find assistance if needed.',
        date: null,
        time: null,
    },
    
];

// Insert categories and opportunities into the database
db.insert(categories, (err, newCategories) => {
    if (err) {
        console.error(err);
    } else {
        console.log('Categories inserted:', newCategories);
    }
});

db.insert(opportunities, (err, newOpportunities) => {
    if (err) {
        console.error(err);
    } else {
        console.log('Opportunities inserted:', newOpportunities);
    }
});

 