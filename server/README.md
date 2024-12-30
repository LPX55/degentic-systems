## Backend APIs and Utility Functions

**WIP:** There are several potential stacks that are being considered for the backend. In the meantime, we will continue to focus on the core functionality and logical implementation of the platform.

Backend implementation ideas and experiments will be shared here as they are developed.

### Example Functions and POCs

The platform will inherently require a lot of backend logic, so we will be sharing POCs, pseudocode, and other experimental implementations here. This will be a living document, and much of the concepts will not be fully implemented into an API until we have a more concrete plan.

### Python Examples

| Concept | Category | Description |
|---------|----------|-------------|
| [factcheck.py](./python-examples/factcheck.py) | Autonomous Agent Tools | Custom API endpoint for multi-source fact checking that is grounded through live and historical sources. |

<details>
<summary>Example output (formatted for human readability)</summary>

```
+------------------------+-------------------------------------------------------------------------------------+
|   Statement or Claim   |   Under the constitution of the Republic of Korea, the presiding President can      |
|                        |   legally declare Martial Law under certain circumstances.                          |
+------------------------+-------------------------------------------------------------------------------------+
|   Fact Check Result    |   TRUE ✅ | Sources indicate a TRUE statement w/ a grounding score of: 0.9          |
+------------------------+-------------------------------------------------------------------------------------+
|   Reason               |   The statement is supported by multiple references indicating that the President   |
|                        |   of South Korea has the constitutional authority to declare martial law under      |
|                        |   specific circumstances, such as responding to military threats or maintaining     |
|                        |   public safety. References detail the legal framework around such declarations,    |
|                        |   including the requirement for deliberation by the State Council. Although some    |
|                        |   references highlight disputes about the legality of recent martial law            |
|                        |   declarations, the broader constitutional provision appears to affirm the          |
|                        |   statement as correct. The overall consensus suggests that the President does      |
|                        |   have legal grounds to declare martial law.                                        |
+------------------------+-------------------------------------------------------------------------------------+

📑 Reference Sources ------------------>
+-------------------------+----------------------------------------------------------------------------+----------------+
|   SOURCE                |   KEY QUOTE                                                                |   INDICATION   |
+-------------------------+----------------------------------------------------------------------------+----------------+
|   apnews.com            |   South Korean President Yoon Suk Yeol declared martial law late           |   TRUE ✅      |
|                         |   Tuesday, vowing to eliminate “anti-state” forces as he struggles         |                |
|                         |   against an opposition that controls the country’s parliament             |                |
|                         |   (https://apnews.com/article/south-korea-martial-law-north-korea-em...)   |                |
+-------------------------+----------------------------------------------------------------------------+----------------+
|   apnews.com            |   South Korean President Yoon Suk Yeol declared an emergency martial       |   TRUE ✅      |
|                         |   law, Tuesday accusing the country’s opposition of controlling the        |                |
|                         |   parliament, sympathizing with North Korea and paralyzing the             |                |
|                         |   government with anti-state activities.                                   |                |
|                         |   (https://apnews.com/article/south-korea-yoon-martial-law-997c22ac9...)   |                |
+-------------------------+----------------------------------------------------------------------------+----------------+
|   en.wikipedia.org      |   the declaration of martial law or alteration in its nature by the        |   TRUE ✅      |
|                         |   President shall undergo deliberation by the State Council                |                |
|                         |   (https://en.wikipedia.org/wiki/2024_South_Korean_martial_law)            |                |
+-------------------------+----------------------------------------------------------------------------+----------------+
|   www.cnn.com           |   Under the country’s constitution, the president has the power to         |   TRUE ✅      |
|                         |   declare extraordinary martial law, which allows special measures         |                |
|                         |   influencing freedoms of speech, press, assembly and association.         |                |
|                         |   (https://www.cnn.com/world/live-news/martial-law-south-korea-intl/...)   |                |
+-------------------------+----------------------------------------------------------------------------+----------------+
|   www.csis.org          |   Under Article 77 of the South Korean Constitution, a president may       |   TRUE ✅      |
|                         |   declare martial law in response to war, incidents, or other national     |                |
|                         |   emergencies.                                                             |                |
|                         |   (https://www.csis.org/analysis/yoon-declares-martial-law-south-kor...)   |                |
+-------------------------+----------------------------------------------------------------------------+----------------+
|   www.dailymail.co.uk   |   the president can declare martial law when it is considered necessary    |   TRUE ✅      |
|                         |   to cope with a military threat or to maintain public safety and order    |                |
|                         |   by mobilising military forces                                            |                |
|                         |   (https://www.dailymail.co.uk/news/article-14153427/Chaos-South-Kor...)   |                |
+-------------------------+----------------------------------------------------------------------------+----------------+
|   www.foxnews.com       |   South Korean President Yoon Suk Yeol declared martial law on Tuesday     |   TRUE ✅      |
|                         |   and accused the opposition party of taking the parliamentary process     |                |
|                         |   hostage with anti-state activities.                                      |                |
|                         |   (https://www.foxnews.com/world/south-korean-president-declares-mar...)   |                |
+-------------------------+----------------------------------------------------------------------------+----------------+
|   www.theguardian.com   |   the declaration of martial law was illegal and called the move 'a        |   FALSE ❌     |
|                         |   declaration of war against the people of the Republic ...'               |                |
|                         |   (https://www.theguardian.com/world/2024/dec/03/south-korean-presid...)   |                |
+-------------------------+----------------------------------------------------------------------------+----------------+
|   www.theguardian.com   |   the parliamentary vote to lift martial law has to be respected           |   TRUE ✅      |
|                         |   (https://www.theguardian.com/world/2024/dec/04/south-korea-martial...)   |                |
+-------------------------+----------------------------------------------------------------------------+----------------+

⚠️  Disclaimer ------------------>

The reliability of the grounding API depends on the quality of the sources it finds. If the search results are poor or biased, the grounding process may echo these flaws, possibly resulting in erroneous or deceptive conclusions. Currently, it's crucial to always fact-check sources and assess the trustworthiness of retrieved data, particularly for critical topics or contentious claims.

Grounding is not applicable to all statements. Personal feelings or experiences cannot be grounded because they are subjective and not based on facts. Similarly, future events or hypothetical scenarios cannot be verified as true or false. In many instances, grounding would be impractical or meaningless.
```
</details>
