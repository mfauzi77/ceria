import { GoogleGenAI, GenerateContentResponse, Type } from "@google/genai";
import { ActiveAlertData, KeyIndicatorData, RegionalForecastData, DomainFilter, RegionDetailData, ResourceData, ScenarioParams, ChildProfile, GrowthRecord, GroundingSource, MonthlySummaryData, DomainComparisonData, SmartRecommendationResponse, DataValidationResult } from "../types";

// Use the real Gemini API, which will be picked up by the functions below.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            const result = reader.result as string;
            // Remove "data:mime/type;base64," prefix
            const base64String = result.split(',')[1];
            resolve(base64String);
        };
        reader.onerror = error => reject(error);
    });
};

export const analyzeCsvDataWithPrompt = async (csvData: string, userPrompt: string): Promise<string> => {
    const prompt = `
      You are an expert data analyst. Your task is to analyze the provided CSV data based on the user's request and provide a comprehensive, well-structured analysis.

      **CSV Data:**
      \`\`\`csv
      ${csvData}
      \`\`\`

      **User's Request:**
      "${userPrompt}"

      **Instructions:**
      1.  Thoroughly analyze the data in the context of the user's request.
      2.  Provide clear, insightful findings.
      3.  If the request involves visualization, describe the key takeaways as if you were presenting a chart.
      4.  Structure your response in neat, well-formed paragraphs. Do not use markdown formatting like headings (#, ##) or bold text (**). You may use numbered or bulleted lists for clarity if needed.
      5.  The entire response must be in Bahasa Indonesia.
    `;
    
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-pro', // Use a more powerful model for analysis
            contents: prompt,
        });
        return response.text;
    } catch (e) {
        console.error("Gemini API call failed in analyzeCsvDataWithPrompt", e);
        throw new Error("Gagal menganalisis data dengan AI. Pastikan file dan prompt valid, lalu coba lagi.");
    }
};


export const extractDataFromFile = async (file: File): Promise<{headers: string[], rows: Record<string, any>[]}> => {
    try {
        const base64Data = await fileToBase64(file);

        const prompt = `You are an expert data extraction API. Your task is to analyze the provided file and extract its tabular data. Return the result as a single JSON object with two keys: 'headers' and 'rows'.
- The value of 'headers' should be a JSON array of strings representing the column headers.
- The value of 'rows' should be a JSON array of arrays, where each inner array represents a row of data corresponding to the headers. All cell values should be converted to strings.
If the file is unreadable or not tabular, return empty arrays for both 'headers' and 'rows' keys.`;
        
        const filePart = {
            inlineData: {
                data: base64Data,
                mimeType: file.type,
            },
        };

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: { parts: [{ text: prompt }, filePart] },
            config: {
                responseMimeType: 'application/json',
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        headers: {
                            type: Type.ARRAY,
                            items: { type: Type.STRING }
                        },
                        rows: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.ARRAY,
                                items: { 
                                    type: Type.STRING 
                                }
                            }
                        }
                    },
                    required: ["headers", "rows"],
                }
            }
        });

        const jsonResponse = JSON.parse(response.text);
        const { headers, rows: dataRows } = jsonResponse;

        if (!headers || headers.length === 0 || !dataRows || dataRows.length === 0) {
            return { headers: [], rows: [] };
        }

        const rows = dataRows.map((rowArray: any[]) => {
            const rowObject: Record<string, any> = {};
            headers.forEach((header: string, index: number) => {
                rowObject[header] = rowArray[index];
            });
            return rowObject;
        });
        
        return { headers, rows };

    } catch(e) {
        console.error("Gemini API call failed in extractDataFromFile", e);
        throw new Error("Gagal mengekstrak data dengan AI. Pastikan file berisi data tabular dan coba lagi.");
    }
};


export const getExecutiveBriefing = async (
    domain: DomainFilter,
    indicators: KeyIndicatorData[],
    alerts: ActiveAlertData[]
): Promise<string> => {
    const criticalAlerts = alerts.filter(a => a.level === 'CRITICAL');
    const highAlerts = alerts.filter(a => a.level === 'HIGH');

    const prompt = `
      You are a senior policy advisor at Kemenko PMK, responsible for monitoring the national PAUD-HI program.
      Your task is to provide a concise, insightful executive briefing based on the latest dashboard data.

      **Current Context:**
      - **Focus Domain:** ${domain}
      - **Key Indicators:**
        ${indicators.map(i => `- ${i.label}: ${i.value} (Trend: ${i.change > 0 ? '+' : ''}${i.change}%)`).join('\n        ')}
      - **Active Alerts Summary:**
        - Total Alerts: ${alerts.length}
        - Critical Alerts: ${criticalAlerts.length} (${criticalAlerts.map(a => `${a.title} in ${a.region}`).join(', ') || 'None'})
        - High Alerts: ${highAlerts.length}

      **Instructions:**
      1.  Start with a headline summarizing the overall situation for the selected domain.
      2.  In one paragraph, analyze the situation. Connect the key indicators with the active alerts. Are the trends in the indicators reflected in the alerts?
      3.  Identify the #1 most pressing issue right now. This should be the most critical alert or a worrying trend.
      4.  Conclude with a single, high-priority strategic recommendation or question to guide the discussion.
      5.  The entire response must be in Bahasa Indonesia. Format your response into neat paragraphs. Do not use markdown formatting like headings (#, ##) or bolding (**). You may create section titles (e.g., "Dasar Analisis") by placing them on their own line.
    `;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });
        return response.text;
    } catch (e: any) {
        console.error("Gemini API call failed in getExecutiveBriefing", e);
        if (e.toString().includes('429')) {
            return `Batas Permintaan AI Tercapai. Anda telah membuat terlalu banyak permintaan dalam waktu singkat. Harap tunggu sebentar sebelum mencoba lagi atau meregenerasi ringkasan.`;
        }
        // Provide a fallback message that is still useful
        return `Analisis AI Tidak Tersedia. Terjadi kesalahan saat menghubungi layanan AI. Namun, berdasarkan data yang ada, terdapat **${criticalAlerts.length} peringatan kritis** dan **${highAlerts.length} peringatan tinggi**. Harap periksa daftar 'Alert Aktif' untuk mengidentifikasi wilayah prioritas dan tindakan yang diperlukan.`;
    }
};


export const getSmartRecommendations = async (alert: ActiveAlertData): Promise<SmartRecommendationResponse> => {
  const prompt = `
    You are an expert in public health policy for early childhood development in Indonesia.
    Based on the following health alert, provide a strategic justification, three specific/actionable/efficient intervention recommendations, and a projected risk score after successful implementation.

    Alert Details:
    - Issue: ${alert.title}
    - Region: ${alert.region}
    - Domain: ${alert.domain}
    - Current Risk Score: ${alert.riskScore}
    ${alert.target ? `- Target: >${alert.target}%` : ''}
    ${alert.trend ? `- Trend: +${alert.trend}%` : ''}

    Instructions:
    1.  **justification**: Write a brief (1-2 sentences) strategic justification for why this intervention is critical.
    2.  **recommendations**: Provide three concrete intervention recommendations in a markdown numbered list. Each numbered item must be on a new line. 
    3.  **projectedRiskScore**: Estimate the new risk score for the region if these recommendations are successfully implemented. It must be a number lower than the current risk score of ${alert.riskScore}.
    
    The entire response must be in Bahasa Indonesia.
  `;

  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              justification: {
                type: Type.STRING,
                description: 'Strategic justification for the intervention in Bahasa Indonesia.',
              },
              recommendations: {
                type: Type.STRING,
                description: 'Three actionable recommendations in markdown format, in Bahasa Indonesia, with each item on a new line.',
              },
              projectedRiskScore: {
                type: Type.NUMBER,
                description: 'The projected risk score after successful intervention.',
              },
            },
            required: ["justification", "recommendations", "projectedRiskScore"],
          },
        },
    });

    const jsonText = response.text.trim();
    if (jsonText.startsWith('{') && jsonText.endsWith('}')) {
        return JSON.parse(jsonText) as SmartRecommendationResponse;
    } else {
        console.error("Gemini response is not a valid JSON:", jsonText);
        throw new Error("Received invalid format from AI.");
    }
    
  } catch (e) {
    console.error("Gemini API call failed in getSmartRecommendations", e);
    return {
        justification: "Analisis AI tidak tersedia saat ini.",
        recommendations: "Terjadi kesalahan saat menghubungi layanan AI. Harap coba lagi. Sebagai tindakan awal, koordinasikan dengan dinas terkait di wilayah tersebut untuk validasi data dan perencanaan awal.",
        projectedRiskScore: alert.riskScore,
    };
  }
};

export const getForecastingInsight = async (
    domain: string,
    horizon: string,
    topIncreases: RegionalForecastData[],
    topDecreases: RegionalForecastData[],
    overallTrend: number
): Promise<string> => {
    const prompt = `
    You are a data scientist specializing in public health forecasting for the Indonesian government.
    Analyze the provided forecasting data for the "${domain}" domain over the next "${horizon}".

    **Key Data Points:**
    - Overall Risk Trend: ${overallTrend > 0 ? `Increasing by an average of ${overallTrend.toFixed(2)} points` : `Decreasing by an average of ${Math.abs(overallTrend).toFixed(2)} points`}.
    - Top 3 Regions with Worsening Risk: ${topIncreases.map(r => `${r.region} (+${r.change})`).join(', ')}.
    - Top 3 Regions with Improving Risk: ${topDecreases.map(r => `${r.region} (${r.change})`).join(', ')}.

    **Task:**
    Provide a concise analytical insight in Bahasa Indonesia.
    Format your response into neat paragraphs. Do not use markdown formatting like headings (#, ##) or bolding (**).
    You may create section titles (e.g., "Faktor Pendorong Tren") by placing them on their own line.
    
    1.  Start with a headline: "Analisis Prediksi Risiko Bidang ${domain}".
    2.  In a summary paragraph, state the overall predicted trend and its primary implication.
    3.  Create a "Faktor Pendorong Tren" section. Based on the domain (${domain}), hypothesize potential real-world reasons for the overall trend (e.g., seasonal changes for Kesehatan, program effects for Gizi).
    4.  Create an "Analisis Wilayah Spesifik" section. Briefly analyze the potential reasons behind the "Eskalasi Tertinggi" and "Perbaikan Terbaik" regions.
    5.  Conclude with a single, actionable "Rekomendasi Awal".
    6.  Include a "Dasar Analisis" section explaining the logic behind your hypotheses.
    `;
    
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });
        return response.text;
    } catch (e) {
        console.error("Gemini API call failed in getForecastingInsight", e);
        return `### Insight Prediksi Tidak Tersedia\n\nTerjadi kesalahan saat menganalisis data prediksi. Harap coba lagi.`;
    }
};

export const getRegionalAnalysisInsight = async (
    regionData: RegionDetailData | ChildProfile
): Promise<string> => {
    const prompt = `
    You are a cross-sectoral policy analyst for PAUD-HI in Indonesia. Your task is to find hidden correlations between different service domains based on the data for a specific region.

    **Region Data: ${regionData.name}**
    - Overall Risk Score: ${'overallRisk' in regionData ? regionData.overallRisk : 'N/A'}
    - Domain Risk Scores:
      ${'domains' in regionData ? Object.entries(regionData.domains).map(([key, value]) => `- ${key}: ${value.riskScore}`).join('\n      ') : 'N/A'}
    - Key Metrics:
      ${'domains' in regionData ? Object.entries(regionData.domains).map(([key, value]) => `  - ${key}:\n` + value.metrics.map(m => `    - ${m.label}: ${m.value}${m.unit} (Nasional: ${m.nationalAverage}${m.unit})`).join('\n')).join('\n') : 'N/A'}

    **Task:**
    1.  Analyze the provided metrics across all domains.
    2.  Identify the most significant **inter-domain correlation**. For example, does poor "Kesejahteraan" (e.g., low access to clean water) strongly correlate with high risk in "Kesehatan" (e.g., high prevalence of ISPA/diarrhea)? Or does low "Pengasuhan" (e.g., PAUD participation) correlate with "Perlindungan" issues?
    3.  Write a concise insight in Bahasa Indonesia. Format your response into neat paragraphs. Do not use markdown formatting like headings (#, ##) or bolding (**). You may create section titles (e.g., "Hipotesis untuk Investigasi") by placing them on their own line.
    4.  Start with a headline: "Analisis Ketergantungan Data untuk ${regionData.name}".
    5.  In one paragraph, clearly state the identified correlation and explain the likely causal link using the provided data points as evidence.
    6.  Conclude with a "Hipotesis untuk Investigasi" section: a single, thought-provoking question that could guide further policy investigation based on your finding.
    7.  Include a "Dasar Analisis" section explaining your reasoning.
    `;
    
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });
        return response.text;
    } catch (e) {
        console.error("Gemini API call failed in getRegionalAnalysisInsight", e);
        return `### Analisis Regional Tidak Tersedia\n\nTerjadi kesalahan saat menganalisis data wilayah. Harap coba lagi.`;
    }
};

export const generateAllocationSuggestion = async (
    totalBudget: number,
    resourceData: ResourceData,
    highestRiskRegions: string[]
): Promise<{ content: string; sources: GroundingSource[] }> => {
    const prompt = `
      You are an economic advisor for the Indonesian government specializing in resource optimization for public health programs, specifically PAUD HI.
      Your objective is to create an optimal resource allocation plan to maximize impact on reducing stunting and improving child health outcomes.

      Current State & Constraints:
      - Total Available Budget: ${totalBudget.toLocaleString('id-ID')} Miliar IDR.
      - Highest Risk Regions (Priority): ${highestRiskRegions.join(', ')}.
      - Forecasted Demand (Deficit):
        - SDM:
          ${resourceData.sdm.map(r => `- ${r.name}: butuh ${r.needed.toLocaleString('id-ID')} ${r.unit}`).join('\n          ')}
        - Anggaran:
          ${resourceData.anggaran.map(r => `- ${r.name}: butuh ${r.needed.toLocaleString('id-ID')} ${r.unit}`).join('\n          ')}
        - Material:
          ${resourceData.material.map(r => `- ${r.name}: butuh ${r.needed.toLocaleString('id-ID')} ${r.unit}`).join('\n          ')}

      Task:
      Based on the principles of cost-effectiveness and maximizing impact, provide a strategic resource allocation recommendation.
      1. Start with a title and a 1-2 sentence summary of your strategic approach.
      2. Provide a clear, actionable allocation plan broken down by Anggaran, SDM, and Material.
      3. For each allocation, provide a brief justification ("Justifikasi") explaining why this allocation is optimal for impact.
      4. Use Google Search to find and cite the latest Indonesian government regulations (Peraturan Pemerintah), presidential decrees (Perpres), or ministerial regulations (Permenkes/Permendikbud) related to stunting prevention, PAUD-HI, and national health budgets. Base your recommendations on these official sources.
      5. Ensure the total proposed budget allocation does not exceed the available budget.
      6. The entire response must be in Bahasa Indonesia and formatted into neat paragraphs. Do not use markdown formatting like headings (#, ##) or bolding (**). You may use numbered lists for clarity.
    `;
    
    try {
        const response: GenerateContentResponse = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                tools: [{googleSearch: {}}],
            },
        });
        
        const content = response.text;
        const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks ?? [];
        const sources: GroundingSource[] = groundingChunks
            .filter(chunk => chunk.web?.uri && chunk.web?.title)
            .map(chunk => ({
                web: {
                    uri: chunk.web!.uri!,
                    title: chunk.web!.title!,
                }
            }));

        return { content, sources };
    } catch (e) {
        console.error("Gemini API call failed in generateAllocationSuggestion", e);
        throw new Error("Gagal menghasilkan saran dari AI. Periksa Kunci API dan koneksi jaringan.");
    }
};

export const generateScenarioAnalysis = async (params: ScenarioParams): Promise<{ content: string, sources: GroundingSource[] }> => {
    const prompt = `
      You are a senior public policy analyst for the Indonesian government.
      Your task is to analyze the potential impact of a "what-if" scenario related to resource allocation for PAUD HI.

      Scenario Details:
      - Budget Change: Anggaran intervensi ${params.budgetChange > 0 ? `dinaikkan sebesar ${params.budgetChange}` : `dikurangi sebesar ${Math.abs(params.budgetChange)}`}%
      - SDM Focus: Prioritas pengerahan SDM difokuskan pada bidang **${params.sdmFocus}**.
      - Regional Focus: Alokasi diprioritaskan untuk wilayah **${params.regionFocus}**.

      Task:
      Provide a concise analysis of this scenario in neat paragraphs.
      1. Start with a clear title summarizing the scenario.
      2. Write a "Ringkasan Eksekutif" (1-2 sentences) of the most likely outcome.
      3. Create a "Potensi Keuntungan" section listing 2-3 potential positive impacts.
      4. Create a "Potensi Risiko" section listing 2-3 potential negative impacts or trade-offs.
      5. Conclude with a "Rekomendasi Mitigasi" section, suggesting one key action to maximize benefits and minimize risks.
      6. Use Google Search to incorporate recent news, official government statements, or policy shifts in Indonesia that could affect this scenario's outcome. Cite your sources.
      7. Do not use markdown formatting like headings (#, ##) or bolding (**). You may create section titles (e.g., "Potensi Keuntungan") by placing them on their own line.
      8. The entire response must be in Bahasa Indonesia.
    `;
    
    try {
        const response: GenerateContentResponse = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                tools: [{ googleSearch: {} }],
            },
        });
        
        const content = response.text;
        const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks ?? [];
        const sources: GroundingSource[] = groundingChunks
            .filter(chunk => chunk.web?.uri && chunk.web?.title)
            .map(chunk => ({
                web: {
                    uri: chunk.web!.uri!,
                    title: chunk.web!.title!,
                }
            }));

        return { content, sources };
    } catch (e) {
        console.error("Gemini API call failed in generateScenarioAnalysis", e);
        throw new Error("Gagal menghasilkan analisis skenario dari AI. Periksa Kunci API dan koneksi jaringan.");
    }
};

export const getParentingInsight = async (
    childProfile: ChildProfile,
    latestGrowth: GrowthRecord | null
): Promise<string> => {
    const prompt = `
      You are a friendly and encouraging early childhood development expert.
      Provide a short, personalized, and actionable tip for a parent based on their child's latest data.
      The child's name is ${childProfile.name}, age ${childProfile.age}.
      Latest measurement: Weight ${latestGrowth?.weight} kg, Height ${latestGrowth?.height} cm.
      Keep it concise (2-3 sentences) and in Bahasa Indonesia.
      Format the response as a clean paragraph without any markdown formatting (like **, #, *, etc.).
      Focus on a positive and encouraging tone.
    `;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });
        return response.text;
    } catch (e) {
        console.error("Gemini API call failed in getParentingInsight", e);
        return `Halo Ayah/Bunda! Terus pantau pertumbuhan ${childProfile.name} ya. Pastikan untuk selalu memberikan makanan bergizi seimbang dan stimulasi yang sesuai usianya.`;
    }
};

export const getMonthlyPerformanceInsight = async (
    monthName: string,
    summary: MonthlySummaryData
): Promise<string> => {
    const prompt = `
        You are a public policy analyst for PAUD-HI Indonesia.
        Summarize the national performance for ${monthName} based on the following data.

        **Data for ${monthName}:**
        - National Risk Score: ${summary.nationalRisk.score.toFixed(1)}
        - Monthly Change: ${summary.nationalRisk.change.toFixed(1)} points.
        - Top Improving Regions: ${summary.topImprovingRegions.map(r => r.name).join(', ')}.
        - Top Worsening Regions: ${summary.topWorseningRegions.map(r => r.name).join(', ')}.

        **Task:**
        Provide an executive summary and a justification in neat paragraphs and Bahasa Indonesia.
        1.  Create a title: "Ringkasan Kinerja Bulan ${monthName}".
        2.  Write an "Analisis Umum" section summarizing the national trend.
        3.  Highlight "Wilayah Berkinerja Terbaik" and explain why they are important to study.
        4.  Highlight "Wilayah Perlu Perhatian" and suggest initial actions.
        5.  Provide a concluding "Rekomendasi" on next steps.
        6.  Add a "Dasar Analisis" section explaining your logic, focusing on why top movers are critical signals.
        7.  Do not use markdown formatting like headings (#, ##) or bolding (**). You may create section titles by placing them on their own line.
    `;
    
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });
        return response.text;
    } catch (e) {
        console.error("Gemini API call failed in getMonthlyPerformanceInsight", e);
        const trendText = summary.nationalRisk.change > 0 ? 'sedikit memburuk' : 'menunjukkan perbaikan';
        return `### Gagal Memuat Analisis AI
        
Terjadi kesalahan. Analisis manual: Kinerja nasional bulan ${monthName} ${trendText}. Perlu investigasi lebih lanjut pada wilayah ${summary.topWorseningRegions.map(r => r.name).join(', ')}.`;
    }
};

export const getDomainComparisonInsight = async (
    year: number,
    comparisonData: DomainComparisonData
): Promise<string> => {
     const prompt = `
        You are a public policy analyst for PAUD-HI Indonesia.
        Provide a comparative analysis across all service domains for the year ${year}.

        **Data for ${year}:**
        ${comparisonData.stats.map(s => `- Domain: ${s.domain}, Avg Risk: ${s.averageRisk.toFixed(1)}, Critical Regions: ${s.criticalRegionsCount}, Best: ${s.bestPerformer.name}, Worst: ${s.worstPerformer.name}`).join('\n')}

        **Task:**
        Provide an executive summary and justification in neat paragraphs and Bahasa Indonesia.
        1.  Create a title: "Analisis Perbandingan Antar Domain Tahun ${year}".
        2.  Identify and analyze the "Tantangan Utama" (the domain with the highest average risk).
        3.  Identify and analyze the "Bidang Paling Stabil" (the domain with the lowest average risk).
        4.  Discuss the "Kesenjangan Kinerja" by using the best/worst performer data as examples.
        5.  Provide a concluding "Rekomendasi Strategis".
        6.  Add a "Dasar Analisis" section explaining your comparative logic.
        7.  Do not use markdown formatting like headings (#, ##) or bolding (**). You may create section titles by placing them on their own line.
    `;
    
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });
        return response.text;
    } catch (e) {
        console.error("Gemini API call failed in getDomainComparisonInsight", e);
        const highestRiskDomain = [...comparisonData.stats].sort((a,b) => b.averageRisk - a.averageRisk)[0];
        return `### Gagal Memuat Analisis AI

Terjadi kesalahan. Analisis manual: Bidang **${highestRiskDomain.domain}** menunjukkan tantangan terbesar tahun ini dengan skor risiko rata-rata **${highestRiskDomain.averageRisk.toFixed(1)}**.`;
    }
};

export const validateUploadedData = async (csvData: string): Promise<DataValidationResult> => {
    const prompt = `
        You are an expert data quality analyst for the Indonesian Ministry of Health, specializing in Early Childhood Development data (PAUD HI).
        Your task is to validate a CSV data file.

        The expected columns and their approximate valid ranges are:
        - province: String (Valid Indonesian province name)
        - cityName: String (Valid Indonesian city/regency name)
        - period: String (Format YYYY-MM)
        - stuntingRate: Number (0-60, anything above 45 is a high outlier)
        - apm: Number (0-100)
        - immunizationRate: Number (0-100)
        - sanitationAccess: Number (0-100)

        CSV Data to Validate:
        \`\`\`csv
        ${csvData}
        \`\`\`

        Instructions:
        1.  Analyze the provided CSV data. The first line is the header.
        2.  Check for the following issues:
            - Missing values in any cell.
            - Incorrect data types (e.g., text in a number column).
            - Outliers (e.g., stuntingRate > 60, apm > 100).
            - Logical inconsistencies (e.g., a cityName that does not belong to the given province).
            - Formatting errors (e.g., incorrect period format).
        3.  Return a JSON object with the following structure:
            - status: "success" if no major issues are found, otherwise "issues_found".
            - summary: A brief one-sentence summary of the validation result in Bahasa Indonesia.
            - issues: An array of objects, where each object represents a specific issue found. Include the row number (starting from 1 for the first data row), column name, the problematic value, and a clear description of the issue in Bahasa Indonesia. If no issues are found, return an empty array.
    `;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        status: { type: Type.STRING },
                        summary: { type: Type.STRING },
                        issues: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.OBJECT,
                                properties: {
                                    row: { type: Type.NUMBER },
                                    column: { type: Type.STRING },
                                    value: { type: Type.STRING },
                                    description: { type: Type.STRING },
                                },
                                required: ["row", "column", "value", "description"],
                            }
                        }
                    },
                    required: ["status", "summary", "issues"],
                },
            },
        });
        const jsonText = response.text.trim();
        return JSON.parse(jsonText) as DataValidationResult;
    } catch (e) {
        console.error("Gemini API call failed in validateUploadedData", e);
        return {
            status: 'issues_found',
            summary: "Gagal memvalidasi data dengan AI.",
            issues: [{
                row: 0,
                column: 'System',
                value: 'Error',
                description: 'Terjadi kesalahan saat berkomunikasi dengan layanan AI. Harap periksa koneksi atau coba lagi nanti.'
            }],
        };
    }
};