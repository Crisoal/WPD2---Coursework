const Datastore = require('nedb');
const db = new Datastore({ filename: 'C:/xampp/htdocs/WDT Coursework/WPD2---Coursework/backend/db/opportunities.db', autoload: true });



// Define your categories and opportunities data
const categories = [
    {

        type: 'category',
        category_id: 'C001',
        name: 'Skills Development',
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
        category_id: 'C001',
        categoryName: 'Skills Development',
        title: 'Leadership Skills Training',
        description: 'Students can find mentors who specialize in leadership development. These mentors can provide guidance on developing leadership skills, managing teams, and leading with confidence.',
        mentorAvailability: [
            {
                mentorName: 'Toke Brown',
                recurringDays: ['Tuesday', 'Thursday'],
                times: ['16:00', '17:00', '18:00', '19:00'],
            },
            {
                mentorName: 'Phil Tunsten',
                recurringDays: ['Thursday', 'Friday'],
                times: ['11:00', '12:00', '16:00'],
            },
            {
                mentorName: 'Allan Bartolome',
                recurringDays: ['Friday', 'Saturday'],
                times: ['10:00', '11:00', '12:00'],
            },

        ],
        sessionDuration: '1 hour',
        image: '/public/images/skills development/pexels-anna-tarazevich-5598284.jpg',
        obj: [
            'Enhancing leadership capabilities',
            'Developing effective team management skills',
            'Building confidence in leadership roles'
        ],
        duration: '1 month (2 sessions)',
    },

    {
        type: 'opportunity',
        category_id: 'C001',
        categoryName: 'Skills Development',
        title: 'Communication and Presentation Skills',
        description: 'Mentors will assist students in improving their communication and presentation abilities, focusing on clarity, persuasion, and effective delivery of ideas.',
        mentorAvailability: [
            {
                mentorName: 'Victor Barry',
                recurringDays: ['Monday', 'Friday', 'Saturday'],
                times: ['14:00', '16:00', '17:00'],
            },
            {
                mentorName: 'Grace Williams',
                recurringDays: ['Monday', 'Wednesday'],
                times: ['13:00', '14:00'],
            },
            {
                mentorName: 'Bisola Mafoluku',
                recurringDays: ['Thursday', 'Friday', 'Saturday'],
                times: ['10:00', '16:00', '17:00'],
            },

        ],
        sessionDuration: '1 hour',
        image: '/public/images/skills development/pexels-andrea-piacquadio-3965676.jpg',
        obj: [
            'Enhancing Clarity in Communication',
            'Developing Persuasive Skills',
            'Effective Delivery of Ideas',
        ],
        duration: '1 month (2 sessions)',
    },
    {
        type: 'opportunity',
        category_id: 'C001',
        categoryName: 'Skills Development',
        title: 'Project Management Coaching',
        description: 'For students interested in project management, mentors can provide coaching on project planning, organization, and execution, helping them develop essential skills for this field.',
        mentorAvailability: [
            {
                mentorName: 'Victor Barry',
                recurringDays: ['Monday', 'Friday', 'Saturday'],
                times: ['14:00', '16:00', '17:00'],
            },
            {
                mentorName: 'Joseph Maedow',
                recurringDays: ['Monday', 'Tuesday', 'Wednesday'],
                times: ['13:00', '15:00', '18:00'],
            },
            {
                mentorName: 'Bisola Mafoluku',
                recurringDays: ['Thursday', 'Friday', 'Saturday'],
                times: ['10:00', '16:00', '17:00'],
            },

        ],
        sessionDuration: '1 hour',
        image: '/public/images/skills development/pexels-annushka-ahuja-8114321.jpg',
        obj: [
            'Project Planning and Organization Skills',
            'Execution and Implementation Strategies',
            'Developing Leadership within Projects',
        ],
        duration: '1 month (2 sessions)',

    },
    {
        type: 'opportunity',
        category_id: 'C001',
        categoryName: 'Skills Development',
        title: 'Coding and Programming Practice',
        description: 'Students pursuing careers in software development can connect with mentors who can guide them through coding challenges, best practices, and programming language-specific training.',
        mentorAvailability: [
            {
                mentorName: 'Phil Tunsten',
                recurringDays: ['Monday', 'Tuesday', 'Saturday'],
                times: ['11:00', '12:00', '16:00'],
            },
            {
                mentorName: 'Grace Williams',
                recurringDays: ['Monday', 'Wednesday'],
                times: ['13:00', '14:00'],
            },
            {
                mentorName: 'Allan Bartolome',
                recurringDays: ['Friday', 'Saturday'],
                times: ['10:00', '11:00', '12:00'],
            },
            {
                mentorName: 'Yovin Poorun',
                recurringDays: ['Friday', 'Saturday'],
                times: ['15:00', '16:00', '17:00', '18:00'],
            },

        ],
        sessionDuration: '1 hour',
        image: '/public/images/skills development/pexels-antoni-shkraba-4348403.jpg',
        obj: [
            'Enhancing problem-solving abilities through coding challenges',
            'Improving proficiency in various programming languages',
            'Building algorithmic thinking and logical reasoning skills',
        ],
        duration: '2 months (4 sessions)',
    },

    {
        type: 'opportunity',
        category_id: 'C001',
        categoryName: 'Skills Development',
        title: 'Data Analysis and Analytics Skills',
        description: 'Mentors will assist students in developing data analysis and analytics skills. This includes working with data tools, statistical analysis, and data visualization techniques.',
        mentorAvailability: [
            {
                mentorName: 'Victor Barry',
                recurringDays: ['Monday', 'Friday', 'Saturday'],
                times: ['14:00', '16:00', '17:00'],
            },
            {
                mentorName: 'Grace Wiliams',
                recurringDays: ['Monday', 'Wednesday'],
                times: ['13:00', '14:00'],
            },
            {
                mentorName: 'Bisola Mafoluku',
                recurringDays: ['Thursday', 'Friday', 'Saturday'],
                times: ['10:00', '16:00', '17:00'],
            },

        ],
        sessionDuration: '1 hour',
        image: '/public/images/skills development/pexels-michael-burrows-7147664.jpg',
        obj: [
            'Mastering data querying and manipulation techniques',
            'Understanding statistical analysis and data visualization',
            'Developing expertise in using analytics tools and platforms',
        ],
        duration: '2 months (4 sessions)',
    },
    {
        type: 'opportunity',
        category_id: 'C001',
        categoryName: 'Skills Development',
        title: 'Soft Skills Development',
        description: 'Mentors will help students refine soft skills such as teamwork, adaptability, problem-solving, and time management, which are valuable in any career.',
        mentorAvailability: [
            {
                mentorName: 'Victor Barry',
                recurringDays: ['Monday', 'Friday', 'Saturday'],
                times: ['14:00', '16:00', '17:00'],
            },
            {
                mentorName: 'Grace Wiliams',
                recurringDays: ['Monday', 'Wednesday'],
                times: ['13:00', '14:00'],
            },
            {
                mentorName: 'Bisola Mafoluku',
                recurringDays: ['Thursday', 'Friday', 'Saturday'],
                times: ['10:00', '16:00', '17:00'],
            },

        ],
        sessionDuration: '1 hour',
        image: '/public/images/skills development/pexels-sora-shimazaki-5926382.jpg',
        obj: [
            'Enhancing communication skills for effective collaboration',
            'Cultivating adaptability and resilience in various situations',
            'Developing strong interpersonal skills for relationship building',
        ],
        duration: '1 month (2 sessions)',
    },



    {
        type: 'opportunity',
        category_id: 'C002',
        categoryName: ' Career Advice',
        title: 'Career Exploration',
        description: ' Provide students with the opportunity to connect with experienced mentors who can help them explore various career paths, industries, and job opportunities. Mentors will offer insights, advice, and guidance on how to navigate the complex world of careers.',
        mentorAvailability: [
            {
                mentorName: 'Toke Brown',
                recurringDays: ['Tuesday', 'Thursday'],
                times: ['16:00', '17:00', '18:00', '19:00'],
            },
            {
                mentorName: 'Phil Tunsten',
                recurringDays: ['Thursday', 'Friday'],
                times: ['11:00', '12:00', '16:00'],
            },
            {
                mentorName: 'Allan Bartolome',
                recurringDays: ['Friday', 'Saturday'],
                times: ['10:00', '11:00', '12:00'],
            },

        ],
        sessionDuration: '1 hour',
        image: '/public/images/career advice/pexels-alex-green-5699479.jpg',
        obj: [
            'Exploring diverse career paths',
            'Understanding different industries',
            'Discovering job opportunities'
        ],
        duration: '1 month (2 sessions)',
    },
    {
        type: 'opportunity',
        category_id: 'C002',
        categoryName: ' Career Advice',
        title: 'Job Search Strategy',
        description: 'Students can seek mentors to help them develop effective job search strategies. Mentors will assist in creating a tailored job search plan, identifying job boards, and networking to increase the chances of landing the right job.',
        mentorAvailability: [
            {
                mentorName: 'Victor Barry',
                recurringDays: ['Monday', 'Friday', 'Saturday'],
                times: ['14:00', '16:00', '17:00'],
            },
            {
                mentorName: 'Grace Williams',
                recurringDays: ['Monday', 'Wednesday'],
                times: ['13:00', '14:00'],
            },
            {
                mentorName: 'Bisola Mafoluku',
                recurringDays: ['Thursday', 'Friday', 'Saturday'],
                times: ['10:00', '16:00', '17:00'],
            },

        ],
        sessionDuration: '1 hour',
        image: '/public/images/career advice/pexels-alexander-suhorucov-6457515.jpg',
        obj: [
            'Developing personalized job search plans',
            'Identifying effective job boards',
            'Networking strategies for job search'
        ],
        duration: '1 month (2 sessions)',

    },
    {
        type: 'opportunity',
        category_id: 'C002',
        categoryName: ' Career Advice',
        title: 'Career Transition Support',
        description: 'This opportunity allows students to connect with mentors who can guide them through career transitions, such as switching industries or roles. Mentors can provide advice on updating resumes, acquiring new skills, and making a successful transition.',
        mentorAvailability: [
            {
                mentorName: 'Victor Barry',
                recurringDays: ['Monday', 'Friday', 'Saturday'],
                times: ['14:00', '16:00', '17:00'],
            },
            {
                mentorName: 'Joseph Maedow',
                recurringDays: ['Monday', 'Tuesday', 'Wednesday'],
                times: ['13:00', '15:00', '18:00'],
            },
            {
                mentorName: 'Bisola Mafoluku',
                recurringDays: ['Thursday', 'Friday', 'Saturday'],
                times: ['10:00', '16:00', '17:00'],
            },

        ],
        sessionDuration: '1 hour',
        image: '/public/images/career advice/pexels-alexander-suhorucov-6457544.jpg',
        obj: [
            'Guidance for career transitions',
            'Resume enhancement tips',
            'Skill acquisition strategies'
        ],
        duration: '1 month (2 sessions)',

    },
    {
        type: 'opportunity',
        category_id: 'C002',
        categoryName: ' Career Advice',
        title: 'Personal Branding',
        description: 'Students can work with mentors to build their personal brand. This includes creating a professional online presence, optimizing LinkedIn profiles, and enhancing their online reputation to attract potential employers or clients.',
        mentorAvailability: [
            {
                mentorName: 'Phil Tunsten',
                recurringDays: ['Monday', 'Tuesday', 'Saturday'],
                times: ['11:00', '12:00', '16:00'],
            },
            {
                mentorName: 'Grace Williams',
                recurringDays: ['Monday', 'Wednesday'],
                times: ['13:00', '14:00'],
            },
            {
                mentorName: 'Allan Bartolome',
                recurringDays: ['Friday', 'Saturday'],
                times: ['10:00', '11:00', '12:00'],
            },
            {
                mentorName: 'Yovin Poorun',
                recurringDays: ['Friday', 'Saturday'],
                times: ['15:00', '16:00', '17:00', '18:00'],
            },

        ],
        sessionDuration: '1 hour',
        image: '/public/images/career advice/pexels-andrea-piacquadio-3771045.jpg',
        obj: [
            'Developing a professional online presence',
            'Optimizing LinkedIn profiles',
            'Building online reputation'
        ],
        duration: '2 months (4 sessions)',
    },
    {
        type: 'opportunity',
        category_id: 'C002',
        categoryName: ' Career Advice',
        title: 'Networking and Connections',
        description: 'Enable students to find mentors who can help them build a professional network. Mentors can share networking tips, introduce students to key industry contacts, and guide them in fostering meaningful connections.',
        mentorAvailability: [
            {
                mentorName: 'Victor Barry',
                recurringDays: ['Monday', 'Friday', 'Saturday'],
                times: ['14:00', '16:00', '17:00'],
            },
            {
                mentorName: 'Grace Wiliams',
                recurringDays: ['Monday', 'Wednesday'],
                times: ['13:00', '14:00'],
            },
            {
                mentorName: 'Bisola Mafoluku',
                recurringDays: ['Thursday', 'Friday', 'Saturday'],
                times: ['10:00', '16:00', '17:00'],
            },

        ],
        sessionDuration: '1 hour',
        image: '/public/images/career advice/pexels-anna-tarazevich-5598285.jpg',
        obj: [
            'Networking strategies and tips',
            'Introductions to industry contacts',
            'Guidance on fostering connections'
        ],
        duration: '2 month (4 sessions)',
    },
    {
        type: 'opportunity',
        category_id: 'C002',
        categoryName: ' Career Advice',
        title: 'Career Goal Setting',
        description: 'Students can seek mentors to help them set and achieve career goals. Mentors can assist in defining clear objectives, creating action plans, and tracking progress toward long-term career success.',
        mentorAvailability: [
            {
                mentorName: 'Victor Barry',
                recurringDays: ['Monday', 'Friday', 'Saturday'],
                times: ['14:00', '16:00', '17:00'],
            },
            {
                mentorName: 'Grace Wiliams',
                recurringDays: ['Monday', 'Wednesday'],
                times: ['13:00', '14:00'],
            },
            {
                mentorName: 'Bisola Mafoluku',
                recurringDays: ['Thursday', 'Friday', 'Saturday'],
                times: ['10:00', '16:00', '17:00'],
            },

        ],
        sessionDuration: '1 hour',
        image: '/public/images/career advice/pexels-mikael-blomkvist-6476582.jpg',
        obj: [
            'Defining clear career objectives',
            'Creating actionable plans',
            'Tracking progress towards career goals'
        ],
        duration: '1 month (2 sessions)',
    },




    // Resume Review
    {
        type: 'opportunity',
        category_id: 'C003',
        categoryName: 'Resume Review',
        title: 'Resume Enhancement',
        description: 'Students can connect with mentors who specialize in resume writing. Mentors will provide personalized feedback and suggestions to improve the content, format, and overall effectiveness of the students',
        mentorAvailability: [
            {
                mentorName: 'Toke Brown',
                recurringDays: ['Tuesday', 'Thursday'],
                times: ['16:00', '17:00', '18:00', '19:00'],
            },
            {
                mentorName: 'Phil Tunsten',
                recurringDays: ['Thursday', 'Friday'],
                times: ['11:00', '12:00', '16:00'],
            },
            {
                mentorName: 'Allan Bartolome',
                recurringDays: ['Friday', 'Saturday'],
                times: ['10:00', '11:00', '12:00'],
            },

        ],
        sessionDuration: '1 hour',
        image: '/public/images/resume/pexels-andrea-piacquadio-3760072.jpg',
        obj: [
            'Improving content and clarity in resumes',
            'Enhancing resume formatting',
            'Optimizing the effectiveness of resumes'
        ],
        duration: '1 session',
    
    },
    {
        type: 'opportunity',
        category_id: 'C003',
        categoryName: 'Resume Review',
        title: 'Cover Letter Assistance',
        description: 'This opportunity allows students to get help from mentors in crafting compelling cover letters. Mentors will offer guidance on tailoring cover letters for specific job applications and making them stand out.',
        mentorAvailability: [
            {
                mentorName: 'Victor Barry',
                recurringDays: ['Monday', 'Friday', 'Saturday'],
                times: ['14:00', '16:00', '17:00'],
            },
            {
                mentorName: 'Grace Williams',
                recurringDays: ['Monday', 'Wednesday'],
                times: ['13:00', '14:00'],
            },
            {
                mentorName: 'Bisola Mafoluku',
                recurringDays: ['Thursday', 'Friday', 'Saturday'],
                times: ['10:00', '16:00', '17:00'],
            },

        ],
        sessionDuration: '1 hour',
        image: '/public/images/resume/pexels-anna-tarazevich-5598289.jpg',
        obj: [
            'Crafting tailored cover letters',
            'Ensuring cover letters stand out',
            'Guidance on cover letter content'
        ],
        duration: '1 session',
    
    },
    {
        type: 'opportunity',
        category_id: 'C003',
        categoryName: 'Resume Review',
        title: 'ATS Optimization',
        description: ' Mentors will assist students in optimizing their resumes for Applicant Tracking Systems (ATS). This includes keyword optimization and formatting recommendations to ensure that resumes pass through ATS filters.',
        mentorAvailability: [
            {
                mentorName: 'Victor Barry',
                recurringDays: ['Monday', 'Friday', 'Saturday'],
                times: ['14:00', '16:00', '17:00'],
            },
            {
                mentorName: 'Joseph Maedow',
                recurringDays: ['Monday', 'Tuesday', 'Wednesday'],
                times: ['13:00', '15:00', '18:00'],
            },
            {
                mentorName: 'Bisola Mafoluku',
                recurringDays: ['Thursday', 'Friday', 'Saturday'],
                times: ['10:00', '16:00', '17:00'],
            },

        ],
        sessionDuration: '1 hour',
        image: '/public/images/resume/pexels-brett-jordan-8500468.jpg',
        obj: [
            'Keyword optimization for ATS',
            'Formatting for ATS compatibility',
            'Maximizing resume success in ATS'
        ],
        duration: '1 session',
    },
    {
        type: 'opportunity',
        category_id: 'C003',
        categoryName: 'Resume Review',
        title: 'Portfolio Review',
        description: 'Students seeking careers in creative fields can connect with mentors for portfolio reviews. Mentors can provide constructive feedback on the organization, presentation, and content of portfolios.',
        mentorAvailability: [
            {
                mentorName: 'Victor Barry',
                recurringDays: ['Monday', 'Friday', 'Saturday'],
                times: ['14:00', '16:00', '17:00'],
            },
            {
                mentorName: 'Grace Wiliams',
                recurringDays: ['Monday', 'Wednesday'],
                times: ['13:00', '14:00'],
            },
            {
                mentorName: 'Bisola Mafoluku',
                recurringDays: ['Thursday', 'Friday', 'Saturday'],
                times: ['10:00', '16:00', '17:00'],
            },

        ],
        sessionDuration: '1 hour',
        image: '/public/images/resume/pexels-lukas-590016.jpg',
        obj: [
            'Feedback on portfolio organization',
            'Enhancing portfolio presentation',
            'Content improvement for portfolios'
        ],
        duration: '1 session',
    
    },
    {
        type: 'opportunity',
        category_id: 'C003',
        categoryName: 'Resume Review',
        title: ' LinkedIn Profile Review',
        description: 'Students can have their LinkedIn profiles reviewed by mentors to enhance their professional online presence. Mentors can suggest improvements in profile completeness, content, and networking strategies.',
        mentorAvailability: [
            {
                mentorName: 'Toke Brown',
                recurringDays: ['Tuesday', 'Thursday'],
                times: ['16:00', '17:00', '18:00', '19:00'],
            },
            {
                mentorName: 'Phil Tunsten',
                recurringDays: ['Thursday', 'Friday'],
                times: ['11:00', '12:00', '16:00'],
            },
            {
                mentorName: 'Allan Bartolome',
                recurringDays: ['Friday', 'Saturday'],
                times: ['10:00', '11:00', '12:00'],
            },

        ],
        sessionDuration: '1 hour',
        image: '/public/images/resume/pexels-markus-winkler-4101343.jpg',
        obj: [
            'Improving profile completeness',
            'Enhancing profile content',
            'Strategies for effective networking'
        ],
        duration: '1 session',
    },
    {
        type: 'opportunity',
        category_id: 'C003',
        categoryName: 'Resume Review',
        title: ' Personal Branding through Documents',
        description: 'Mentors can help students understand how to use their resumes and cover letters as tools for personal branding. They can guide students on how to present themselves authentically and effectively through these documents.',
        mentorAvailability: [
            {
                mentorName: 'Victor Barry',
                recurringDays: ['Monday', 'Friday', 'Saturday'],
                times: ['14:00', '16:00', '17:00'],
            },
            {
                mentorName: 'Grace Williams',
                recurringDays: ['Monday', 'Wednesday'],
                times: ['13:00', '14:00'],
            },
            {
                mentorName: 'Bisola Mafoluku',
                recurringDays: ['Thursday', 'Friday', 'Saturday'],
                times: ['10:00', '16:00', '17:00'],
            },

        ],
        sessionDuration: '1 hour',
        image: '/public/images/resume/pexels-tara-winstead-7666429.jpg',
        obj: [
            'Utilizing documents for personal branding',
            'Presenting authentic self through documents',
            'Effective communication of personal brand'
        ],
        duration: '1 session',

    },
   


    // Mock Interview

    {
        type: 'opportunity',
        category_id: 'C004',
        categoryName: 'Mock Interview',
        title: ' Interview Preparation',
        description: 'Students can practice and prepare for job interviews with experienced mentors who will conduct mock interviews and provide constructive feedback on performance.',
        mentorAvailability: [
            {
                mentorName: 'Toke Brown',
                recurringDays: ['Tuesday', 'Thursday'],
                times: ['16:00', '17:00', '18:00', '19:00'],
            },
            {
                mentorName: 'Phil Tunsten',
                recurringDays: ['Thursday', 'Friday'],
                times: ['11:00', '12:00', '16:00'],
            },
            {
                mentorName: 'Allan Bartolome',
                recurringDays: ['Friday', 'Saturday'],
                times: ['10:00', '11:00', '12:00'],
            },

        ],
        sessionDuration: '30 minutes',
        image: '/public/images/mock interview/pexels-anna-shvets-4226140.jpg',
        obj: [
            'Practice and refine interview skills',
            'Receive constructive feedback',
            'Familiarize with common interview questions'
        ],
        duration: '1 session',
    
    },
    {
        type: 'opportunity',
        category_id: 'C004',
        categoryName: 'Mock Interview',
        title: '  Behavioural Interview Coaching',
        description: ' Mentors will specialize in coaching students for behavioral interviews. They can provide tips and guidance on answering common behavioral questions with confidence and clarity.',
        mentorAvailability: [
            {
                mentorName: 'Victor Barry',
                recurringDays: ['Monday', 'Friday', 'Saturday'],
                times: ['14:00', '16:00', '17:00'],
            },
            {
                mentorName: 'Grace Williams',
                recurringDays: ['Monday', 'Wednesday'],
                times: ['13:00', '14:00'],
            },
            {
                mentorName: 'Bisola Mafoluku',
                recurringDays: ['Thursday', 'Friday', 'Saturday'],
                times: ['10:00', '16:00', '17:00'],
            },

        ],
        sessionDuration: '30 minutes',
        image: '/public/images/mock interview/pexels-anna-tarazevich-5598283.jpg',
        obj: [
            'Prepare for behavioral interview scenarios',
            'Gain confidence in answering behavioral questions',
            'Learn effective strategies for behavioral interviews'
        ],
        duration: '1 session',
    
    },
    {
        type: 'opportunity',
        category_id: 'C004',
        categoryName: 'Mock Interview',
        title: ' Technical Interview Simulation',
        description: 'For students pursuing technical careers, mentors can simulate technical interviews relevant to their field, helping them prepare for coding challenges, technical questions, and problem-solving scenarios.',
        mentorAvailability: [
            {
                mentorName: 'Victor Barry',
                recurringDays: ['Monday', 'Friday', 'Saturday'],
                times: ['14:00', '16:00', '17:00'],
            },
            {
                mentorName: 'Joseph Maedow',
                recurringDays: ['Monday', 'Tuesday', 'Wednesday'],
                times: ['13:00', '15:00', '18:00'],
            },
            {
                mentorName: 'Bisola Mafoluku',
                recurringDays: ['Thursday', 'Friday', 'Saturday'],
                times: ['10:00', '16:00', '17:00'],
            },

        ],
        sessionDuration: '30 minutes',
        image: '/public/images/mock interview/pexels-mart-production-7606056.jpg',
        obj: [
            'Simulate technical interview scenarios',
            'Practice coding challenges and problem-solving',
            'Get familiar with technical questions in the field'
        ],
        duration: '1 session',
    },
    {
        type: 'opportunity',
        category_id: 'C004',
        categoryName: 'Mock Interview',
        title: 'Presentation Skills',
        description: 'Students can connect with mentors who can improve their presentation and communication skills. This can be especially useful for roles that require public speaking or client interactions.',
        mentorAvailability: [
            {
                mentorName: 'Victor Barry',
                recurringDays: ['Monday', 'Friday', 'Saturday'],
                times: ['14:00', '16:00', '17:00'],
            },
            {
                mentorName: 'Grace Wiliams',
                recurringDays: ['Monday', 'Wednesday'],
                times: ['13:00', '14:00'],
            },
            {
                mentorName: 'Bisola Mafoluku',
                recurringDays: ['Thursday', 'Friday', 'Saturday'],
                times: ['10:00', '16:00', '17:00'],
            },

        ],
        sessionDuration: '30 minutes',
        image: '/public/images/mock interview/pexels-mizuno-k-12912109.jpg',
        obj: [
            'Enhance presentation and communication abilities',
            'Improve public speaking skills',
            'Develop effective client interaction techniques'
        ],
        duration: '1 session',
    
    },
    {
        type: 'opportunity',
        category_id: 'C004',
        categoryName: 'Mock Interview',
        title: 'Case Interview Practice',
        description: 'Mentors can assist students interested in consulting or related fields by conducting case interview practice sessions. They can guide students in solving business cases and provide valuable feedback.',
        mentorAvailability: [
            {
                mentorName: 'Toke Brown',
                recurringDays: ['Tuesday', 'Thursday'],
                times: ['16:00', '17:00', '18:00', '19:00'],
            },
            {
                mentorName: 'Phil Tunsten',
                recurringDays: ['Thursday', 'Friday'],
                times: ['11:00', '12:00', '16:00'],
            },
            {
                mentorName: 'Allan Bartolome',
                recurringDays: ['Friday', 'Saturday'],
                times: ['10:00', '11:00', '12:00'],
            },

        ],
        sessionDuration: '30 minutes',
        image: '/public/images/mock interview/pexels-tima-miroshnichenko-5439453.jpg',
        obj: [
            'Practice solving business cases',
            'Gain insights into consulting-related interviews',
            'Receive guidance on case interview techniques'
        ],
        duration: '1 session',
    },
    {
        type: 'opportunity',
        category_id: 'C004',
        categoryName: 'Mock Interview',
        title: 'Confidence Building',
        description: 'Some students may need confidence-building support. Mentors can help students boost their self-assurance, body language, and overall presence during interviews to make a lasting impression.',
        mentorAvailability: [
            {
                mentorName: 'Victor Barry',
                recurringDays: ['Monday', 'Friday', 'Saturday'],
                times: ['14:00', '16:00', '17:00'],
            },
            {
                mentorName: 'Grace Williams',
                recurringDays: ['Monday', 'Wednesday'],
                times: ['13:00', '14:00'],
            },
            {
                mentorName: 'Bisola Mafoluku',
                recurringDays: ['Thursday', 'Friday', 'Saturday'],
                times: ['10:00', '16:00', '17:00'],
            },

        ],
        sessionDuration: '30 minutes',
        image: '/public/images/mock interview/pexels-tima-miroshnichenko-5439469.jpg',
        obj: [
            'Boost self-assurance for interviews',
            'Improve body language and presence',
            'Develop strategies for a confident interview demeanor'
        ],
        duration: '1 session',

    },


    // Well-being
    {
        type: 'opportunity',
        category_id: 'C005',
        categoryName: 'Well-being',
        title: 'Stress Management and Resilience Building',
        description: 'Students can connect with mentors who can provide guidance on managing stress, building resilience, and maintaining mental well-being in a challenging academic and professional environment.',
        mentorAvailability: [
            {
                mentorName: 'Toke Brown',
                recurringDays: ['Tuesday', 'Thursday'],
                times: ['16:00', '17:00', '18:00', '19:00'],
            },
            {
                mentorName: 'Phil Tunsten',
                recurringDays: ['Thursday', 'Friday'],
                times: ['11:00', '12:00', '16:00'],
            },
            {
                mentorName: 'Allan Bartolome',
                recurringDays: ['Friday', 'Saturday'],
                times: ['10:00', '11:00', '12:00'],
            },

        ],
        sessionDuration: '45 minutes',
        image: '/public/images/well-being/pexels-irina-iriser-1379627.jpg',
        obj: [
            'Building resilience in challenging situations',
            'Providing strategies for stress management',
            'Enhancing coping mechanisms'
        ],
        duration: '1 month (2 sessions)',
    },
    
    {
        type: 'opportunity',
        category_id: 'C005',
        categoryName: 'Well-being',
        title: 'Mindfulness and Meditation',
        description: 'Mentors can offer sessions on mindfulness and meditation to help students reduce anxiety, improve focus, and enhance their overall emotional well-being.',
        mentorAvailability: [
            {
                mentorName: 'Victor Barry',
                recurringDays: ['Monday', 'Friday', 'Saturday'],
                times: ['14:00', '16:00', '17:00'],
            },
            {
                mentorName: 'Grace Williams',
                recurringDays: ['Monday', 'Wednesday'],
                times: ['13:00', '14:00'],
            },
            {
                mentorName: 'Bisola Mafoluku',
                recurringDays: ['Thursday', 'Friday', 'Saturday'],
                times: ['10:00', '16:00', '17:00'],
            },

        ],
        sessionDuration: '45 minutes',
        image: '/public/images/well-being/pexels-karyme-frança-1535907.jpg',
        obj: [
            'Teaching mindfulness techniques for reducing anxiety',
            'Guiding meditation practices to improve focus',
            'Enhancing emotional well-being through mindfulness'
        ],
        duration: '1 month (2 sessions)',
    },
    {
        type: 'opportunity',
        category_id: 'C005',
        categoryName: 'Well-being',
        title: 'Nutrition and Wellness Coaching',
        description: 'Students can find mentors who specialize in nutrition and wellness. These mentors can provide advice on maintaining a healthy lifestyle, balanced diet, and physical well-being.',
        mentorAvailability: [
            {
                mentorName: 'Victor Barry',
                recurringDays: ['Monday', 'Friday', 'Saturday'],
                times: ['14:00', '16:00', '17:00'],
            },
            {
                mentorName: 'Joseph Maedow',
                recurringDays: ['Monday', 'Tuesday', 'Wednesday'],
                times: ['13:00', '15:00', '18:00'],
            },
            {
                mentorName: 'Bisola Mafoluku',
                recurringDays: ['Thursday', 'Friday', 'Saturday'],
                times: ['10:00', '16:00', '17:00'],
            },

        ],
        sessionDuration: '45 minutes',
        image: '/public/images/well-being/pexels-lumn-351961.jpg',
        obj: [
            'Offering advice on maintaining a balanced diet',
            'Providing guidance for a healthy lifestyle',
            'Promoting physical well-being through nutrition'
        ],
        duration: '1 month (2 sessions)',

    },
    {
        type: 'opportunity',
        category_id: 'C005',
        categoryName: 'Well-being',
        title: 'Time Management and Work-Life Balance',
        description: 'Mentors can guide students in effective time management and achieving work-life balance, which is crucial for their overall well-being and success.',
        mentorAvailability: [
            {
                mentorName: 'Phil Tunsten',
                recurringDays: ['Monday', 'Tuesday', 'Saturday'],
                times: ['11:00', '12:00', '16:00'],
            },
            {
                mentorName: 'Grace Williams',
                recurringDays: ['Monday', 'Wednesday'],
                times: ['13:00', '14:00'],
            },
            {
                mentorName: 'Allan Bartolome',
                recurringDays: ['Friday', 'Saturday'],
                times: ['10:00', '11:00', '12:00'],
            },
            {
                mentorName: 'Yovin Poorun',
                recurringDays: ['Friday', 'Saturday'],
                times: ['15:00', '16:00', '17:00', '18:00'],
            },

        ],
        sessionDuration: '45 minutes',
        image: '/public/images/well-being/pexels-marta-branco-1295572.jpg',
        obj: [
            'Teaching effective time management skills',
            'Balancing academic/professional life with personal time',
            'Fostering strategies for a healthy work-life balance'
        ],
        duration: '1 month (2 sessions)',
    },
    {
        type: 'opportunity',
        category_id: 'C005',
        categoryName: 'Well-being',
        title: 'Peer Support and Peer Mentoring',
        description: 'Facilitate peer mentoring for emotional support, connecting students with peers who can share experiences and provide support during challenging times.',
        mentorAvailability: [
            {
                mentorName: 'Victor Barry',
                recurringDays: ['Monday', 'Friday', 'Saturday'],
                times: ['14:00', '16:00', '17:00'],
            },
            {
                mentorName: 'Grace Wiliams',
                recurringDays: ['Monday', 'Wednesday'],
                times: ['13:00', '14:00'],
            },
            {
                mentorName: 'Bisola Mafoluku',
                recurringDays: ['Thursday', 'Friday', 'Saturday'],
                times: ['10:00', '16:00', '17:00'],
            },

        ],
        sessionDuration: '45 minutes',
        image: '/public/images/well-being/pexels-nicollazzi-xiong-668353.jpg',
        obj: [
            'Creating a supportive peer network',
            'Sharing experiences for mutual support',
            'Building connections for emotional assistance'
        ],
        duration: '2 months (4 sessions)',
    },
    {
        type: 'opportunity',
        category_id: 'C005',
        categoryName: 'Well-being',
        title: 'Mental Health Resources',
        description: 'Provide access to mental health resources, including articles, videos, and guides, to help students learn about mental health and find assistance if needed.',
        mentorAvailability: [
            {
                mentorName: 'Victor Barry',
                recurringDays: ['Monday', 'Friday', 'Saturday'],
                times: ['14:00', '16:00', '17:00'],
            },
            {
                mentorName: 'Grace Wiliams',
                recurringDays: ['Monday', 'Wednesday'],
                times: ['13:00', '14:00'],
            },
            {
                mentorName: 'Bisola Mafoluku',
                recurringDays: ['Thursday', 'Friday', 'Saturday'],
                times: ['10:00', '16:00', '17:00'],
            },

        ],
        sessionDuration: '45 minutes',
        image: '/public/images/well-being/pexels-pixabay-40751.jpg',
        obj: [
            'Providing access to informative articles on mental health',
            'Sharing educational videos for mental health awareness',
            'Offering guides to find mental health assistance'
        ],
        duration: '1 month (2 sessions)',
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

