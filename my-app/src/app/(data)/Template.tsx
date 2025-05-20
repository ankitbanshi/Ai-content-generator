export default [
  {
    name: 'Blog Title',
    desc: 'This is a blog related to xyz',
    category: 'Blog',
    icon: 'https://cdn-icons-png.flaticon.com/128/12992/12992834.png',
    aiPrompt: 'Give me 5 description point related to blog that will get you to content',
    slug: 'generate-blog-title',
    form: [
      {
        label: 'Enter your blog niche',
        field: 'input',
        name: 'niche',
        required: true
      },
      {
        label: 'Enter your blog outline',
        field: 'text area',
        name: 'outline'
      }
    ]
  },
  {
    name: 'Product Description Generator',
    desc: 'Generate persuasive product descriptions for e-commerce listings.',
    category: 'E-commerce',
    icon: 'https://cdn-icons-png.flaticon.com/128/3523/3523063.png',
    aiPrompt: 'Generate a compelling product description based on the following product details.',
    slug: 'generate-product-description',
    form: [
      {
        label: 'Enter product name',
        field: 'input',
        name: 'productName',
        required: true
      },
      {
        label: 'Enter key features',
        field: 'text area',
        name: 'features'
      }
    ]
  },
  {
    name: 'Social Media Caption Generator',
    desc: 'Get catchy captions for Instagram, Twitter, or Facebook posts.',
    category: 'Social Media',
    icon: 'https://cdn-icons-png.flaticon.com/128/1051/1051309.png',
    aiPrompt: 'Write a catchy social media caption based on the content description.',
    slug: 'generate-caption',
    form: [
      {
        label: 'Describe your post',
        field: 'text area',
        name: 'postDescription',
        required: true
      },
      {
        label: 'Enter platform (Instagram/Twitter/Facebook)',
        field: 'input',
        name: 'platform'
      }
    ]
  },
  {
    name: 'SEO Meta Description Generator',
    desc: 'Create optimized meta descriptions for better search engine ranking.',
    category: 'SEO',
    icon: 'https://cdn-icons-png.flaticon.com/128/739/739249.png',
    aiPrompt: 'Generate an SEO-friendly meta description for the given page content.',
    slug: 'generate-meta-description',
    form: [
      {
        label: 'Enter page title',
        field: 'input',
        name: 'pageTitle',
        required: true
      },
      {
        label: 'Briefly describe the page content',
        field: 'text area',
        name: 'pageContent'
      }
    ]
  },
  {
    name: 'Email Subject Line Generator',
    desc: 'Generate high-converting subject lines for your email campaigns.',
    category: 'Email Marketing',
    icon: 'https://cdn-icons-png.flaticon.com/128/561/561127.png',
    aiPrompt: 'Create a persuasive and high-converting subject line for this email.',
    slug: 'generate-email-subject',
    form: [
      {
        label: 'Enter email topic',
        field: 'input',
        name: 'emailTopic',
        required: true
      },
      {
        label: 'Enter target audience',
        field: 'input',
        name: 'audience'
      }
    ]
  },
  {
    name: 'Ad Copy Generator',
    desc: 'Generate attention-grabbing ad copies for digital marketing.',
    category: 'Marketing',
    icon: 'https://cdn-icons-png.flaticon.com/128/3135/3135715.png',
    aiPrompt: 'Write a persuasive ad copy based on product and audience.',
    slug: 'generate-ad-copy',
    form: [
      {
        label: 'Enter product/service name',
        field: 'input',
        name: 'product',
        required: true
      },
      {
        label: 'Describe your target audience',
        field: 'text area',
        name: 'audience'
      }
    ]
  }
];
