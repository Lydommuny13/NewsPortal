-- Add remaining news articles
INSERT INTO articles (
  title,
  title_km,
  content,
  content_km,
  excerpt,
  excerpt_km,
  status,
  slug,
  author_id,
  is_breaking,
  trending_score,
  featured_image,
  created_at
) VALUES
-- Article 4: Gaza Conflict
(
  'UN Warns of Humanitarian Crisis as Gaza Conflict Intensifies',
  'អង្គការសហប្រជាជាតិព្រមានពីវិបត្តិមនុស្សធម៌ខណៈជម្លោះហ្គាហ្សាកាន់តែខ្លាំង',
  'The United Nations has issued an urgent warning about the deteriorating humanitarian situation in Gaza. With limited access to food, water, and medical supplies, civilians face increasingly dire conditions. International aid organizations call for immediate humanitarian corridors.',
  'អង្គការសហប្រជាជាតិបានចេញការព្រមានបន្ទាន់អំពីស្ថានភាពមនុស្សធម៌ដែលកំពុងធ្ងន់ធ្ងរនៅហ្គាហ្សា។ ជាមួយនឹងការទទួលបានស្បៀងអាហារ ទឹក និងគ្រឿងផ្គត់ផ្គង់វេជ្ជសាស្ត្រមានកម្រិត ជនស៊ីវិលប្រឈមនឹងស្ថានភាពកាន់តែអាក្រក់។ អង្គការជំនួយមនុស្សធម៌អន្តរជាតិអំពាវនាវឱ្យមានរបៀងមនុស្សធម៌ភ្លាមៗ។',
  'UN issues urgent warning about Gaza humanitarian crisis as civilians face severe shortages of essential supplies.',
  'អង្គការសហប្រជាជាតិចេញការព្រមានបន្ទាន់អំពីវិបត្តិមនុស្សធម៌នៅហ្គាហ្សា ខណៈជនស៊ីវិលប្រឈមនឹងការខ្វះខាតគ្រឿងផ្គត់ផ្គង់ចាំបាច់យ៉ាងធ្ងន់ធ្ងរ។',
  'published',
  'un-warns-humanitarian-crisis-gaza',
  (SELECT id FROM profiles WHERE role = 'admin' LIMIT 1),
  true,
  88,
  'https://source.unsplash.com/random/1920x1080?humanitarian',
  '2024-01-15T14:30:00Z'
),

-- Article 5: Climate Change
(
  '2024 Already Breaking Global Temperature Records',
  'ឆ្នាំ២០២៤ កំពុងបំបែកកំណត់ត្រាសីតុណ្ហភាពសកល',
  'Scientists report that 2024 has already broken several global temperature records in its first weeks. The unprecedented heat is linked to climate change and a strong El Niño event, raising concerns about extreme weather patterns throughout the year.',
  'អ្នកវិទ្យាសាស្ត្ររាយការណ៍ថា ឆ្នាំ២០២៤ បានបំបែកកំណត់ត្រាសីតុណ្ហភាពសកលជាច្រើនក្នុងសប្តាហ៍ដំបូងរបស់ខ្លួន។ កម្តៅដែលមិនធ្លាប់មានពីមុនមកត្រូវបានភ្ជាប់ទៅនឹងការប្រែប្រួលអាកាសធាតុ និងព្រឹត្តិការណ៍អេលនីញ៉ូខ្លាំង ដែលបង្កើនការព្រួយបារម្ភអំពីលំនាំអាកាសធាតុធ្ងន់ធ្ងរពេញមួយឆ្នាំ។',
  'Global temperatures hit new records in early 2024, scientists warn of extreme weather ahead.',
  'សីតុណ្ហភាពសកលឈានដល់កំណត់ត្រាថ្មីនៅដើមឆ្នាំ២០២៤ អ្នកវិទ្យាសាស្ត្រព្រមានពីអាកាសធាតុធ្ងន់ធ្ងរខាងមុខ។',
  'published',
  '2024-breaking-global-temperature-records',
  (SELECT id FROM profiles WHERE role = 'admin' LIMIT 1),
  false,
  82,
  'https://source.unsplash.com/random/1920x1080?climate',
  '2024-01-14T10:45:00Z'
),

-- Article 6: Technology
(
  'Apple Vision Pro Set to Launch, Marking New Era in Mixed Reality',
  'Apple Vision Pro ត្រៀមដាក់លក់ សញ្ញាណនៃយុគសម័យថ្មីក្នុងបច្ចេកវិទ្យាចម្រុះ',
  'Apple announces the launch date for its highly anticipated Vision Pro mixed reality headset. The device, priced at $3,499, promises to revolutionize how we interact with digital content through advanced spatial computing.',
  'Apple ប្រកាសកាលបរិច្ឆេទដាក់លក់កាសពាក់ចម្រុះ Vision Pro ដែលត្រូវបានរង់ចាំយ៉ាងខ្លាំង។ ឧបករណ៍នេះមានតម្លៃ ៣.៤៩៩ ដុល្លារ សន្យានឹងបដិវត្តន៍របៀបដែលយើងធ្វើអន្តរកម្មជាមួយមាតិកាឌីជីថលតាមរយៈការគណនាលំហកម្រិតខ្ពស់។',
  'Apple Vision Pro mixed reality headset launch date announced, promising revolutionary spatial computing experience.',
  'កាសពាក់ចម្រុះ Apple Vision Pro ប្រកាសកាលបរិច្ឆេទដាក់លក់ សន្យានឹងផ្តល់បទពិសោធន៍គណនាលំហបដិវត្តន៍។',
  'published',
  'apple-vision-pro-launch-new-era-mixed-reality',
  (SELECT id FROM profiles WHERE role = 'admin' LIMIT 1),
  false,
  80,
  'https://source.unsplash.com/random/1920x1080?technology',
  '2024-01-13T16:20:00Z'
),

-- Article 7: Sports
(
  'Africa Cup of Nations 2024 Kicks Off in Ivory Coast',
  'ពានរង្វាន់បាល់ទាត់អាហ្វ្រិក ២០២៤ ចាប់ផ្តើមនៅកូតឌីវ័រ',
  'The 2024 Africa Cup of Nations begins in Ivory Coast with 24 teams competing for continental glory. The tournament features some of Africa''s biggest football stars and promises exciting matches.',
  'ពានរង្វាន់បាល់ទាត់អាហ្វ្រិក ២០២៤ ចាប់ផ្តើមនៅកូតឌីវ័រ ដោយមានក្រុមចំនួន ២៤ ប្រកួតប្រជែងដណ្តើមកិត្តិយសទ្វីប។ ការប្រកួតនេះមានការចូលរួមពីតារាបាល់ទាត់ល្បីៗរបស់អាហ្វ្រិក និងសន្យានឹងមានការប្រកួតគួរឱ្យរំភើប។',
  'Africa Cup of Nations 2024 begins in Ivory Coast, featuring 24 teams competing for continental championship.',
  'ពានរង្វាន់បាល់ទាត់អាហ្វ្រិក ២០២៤ ចាប់ផ្តើមនៅកូតឌីវ័រ ដោយមានក្រុមចំនួន ២៤ ប្រកួតប្រជែងដណ្តើមជើងឯកទ្វីប។',
  'published',
  'africa-cup-nations-2024-kicks-off',
  (SELECT id FROM profiles WHERE role = 'admin' LIMIT 1),
  false,
  75,
  'https://source.unsplash.com/random/1920x1080?soccer',
  '2024-01-13T20:00:00Z'
),

-- Article 8: Economy
(
  'Global Markets React to Rising Geopolitical Tensions',
  'ទីផ្សារសកលឆ្លើយតបទៅនឹងភាពតានតឹងភូមិសាស្ត្រនយោបាយកើនឡើង',
  'Global financial markets show volatility as geopolitical tensions rise in multiple regions. Investors closely monitor situations in the Middle East and Asia, while central banks prepare response measures.',
  'ទីផ្សារហិរញ្ញវត្ថុសកលបង្ហាញភាពមិនប្រក្រតីខណៈភាពតានតឹងភូមិសាស្ត្រនយោបាយកើនឡើងក្នុងតំបន់ជាច្រើន។ វិនិយោគិនតាមដានយ៉ាងដិតដល់នូវស្ថានភាពនៅមជ្ឈិមបូព៌ា និងអាស៊ី ខណៈធនាគារកណ្តាលត្រៀមវិធានការឆ្លើយតប។',
  'Financial markets experience volatility amid rising global tensions, central banks prepare responses.',
  'ទីផ្សារហិរញ្ញវត្ថុជួបប្រទះភាពមិនប្រក្រតីក្នុងពេលភាពតានតឹងសកលកើនឡើង ធនាគារកណ្តាលត្រៀមវិធានការឆ្លើយតប។',
  'published',
  'global-markets-react-rising-geopolitical-tensions',
  (SELECT id FROM profiles WHERE role = 'admin' LIMIT 1),
  false,
  70,
  'https://source.unsplash.com/random/1920x1080?finance',
  '2024-01-12T15:45:00Z'
),

-- Article 9: Health
(
  'WHO Reports New COVID Variant Under Monitoring',
  'អង្គការសុខភាពពិភពលោករាយការណ៍ពីការតាមដានវ៉ារ្យង់កូវីដថ្មី',
  'The World Health Organization announces monitoring of a new COVID-19 variant. While not yet a variant of concern, scientists are studying its transmission patterns and potential impact on global health.',
  'អង្គការសុខភាពពិភពលោកប្រកាសពីការតាមដានវ៉ារ្យង់កូវីដ-១៩ថ្មី។ ខណៈមិនទាន់ជាវ៉ារ្យង់គួរឱ្យព្រួយបារម្ភនៅឡើយ អ្នកវិទ្យាសាស្ត្រកំពុងសិក្សាពីលំនាំនៃការចម្លង និងផលប៉ះពាល់ដែលអាចកើតមានលើសុខភាពសកល។',
  'WHO monitors new COVID variant, scientists study transmission patterns and potential health impacts.',
  'អង្គការសុខភាពពិភពលោកតាមដានវ៉ារ្យង់កូវីដថ្មី អ្នកវិទ្យាសាស្ត្រសិក្សាលំនាំចម្លង និងផលប៉ះពាល់សុខភាព។',
  'published',
  'who-reports-new-covid-variant-monitoring',
  (SELECT id FROM profiles WHERE role = 'admin' LIMIT 1),
  false,
  65,
  'https://source.unsplash.com/random/1920x1080?health',
  '2024-01-11T13:15:00Z'
),

-- Article 10: Space Exploration
(
  'NASA Announces New Mars Mission Timeline',
  'ណាសាប្រកាសកាលវិភាគបេសកកម្មភពអង្គារថ្មី',
  'NASA reveals updated timeline for upcoming Mars missions, including new rover deployments and sample return missions. The space agency emphasizes international collaboration and advanced technology integration.',
  'ណាសាបង្ហាញកាលវិភាគថ្មីសម្រាប់បេសកកម្មភពអង្គារខាងមុខ រួមទាំងការដាក់ពង្រាយយានយន្តស្វ័យប្រវត្តិថ្មី និងបេសកកម្មប្រមូលសំណាកត្រឡប់មកវិញ។ ទីភ្នាក់ងារអវកាសសង្កត់ធ្ងន់លើកិច្ចសហប្រតិបត្តិការអន្តរជាតិ និងការរួមបញ្ចូលបច្ចេកវិទ្យាទំនើប។',
  'NASA updates Mars mission timeline, emphasizing international collaboration and advanced technology.',
  'ណាសាធ្វើបច្ចុប្បន្នភាពកាលវិភាគបេសកកម្មភពអង្គារ ដោយសង្កត់ធ្ងន់លើកិច្ចសហប្រតិបត្តិការអន្តរជាតិ និងបច្ចេកវិទ្យាទំនើប។',
  'published',
  'nasa-announces-new-mars-mission-timeline',
  (SELECT id FROM profiles WHERE role = 'admin' LIMIT 1),
  false,
  60,
  'https://source.unsplash.com/random/1920x1080?mars',
  '2024-01-10T11:30:00Z'
);