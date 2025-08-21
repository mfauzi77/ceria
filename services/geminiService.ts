

import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { ActiveAlertData, KeyIndicatorData, RegionalForecastData, DomainFilter, RegionDetailData, ResourceData, ScenarioParams, ChildProfile, GrowthRecord, GroundingSource, MonthlySummaryData, DomainComparisonData } from "../types";

// Use the real Gemini API, which will be picked up by the functions below.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });


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
      5.  The entire response must be in Bahasa Indonesia. Format as simple markdown. Add a "Dasar Analisis" section explaining your reasoning.
    `;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });
        return response.text;
    } catch (e) {
        console.error("Gemini API call failed in getExecutiveBriefing", e);
        // Provide a fallback message that is still useful
        return `### Analisis AI Tidak Tersedia\n\nTerjadi kesalahan saat menghubungi layanan AI. Namun, berdasarkan data yang ada:\n- **Perhatian Utama:** Terdapat **${criticalAlerts.length} peringatan kritis** dan **${highAlerts.length} peringatan tinggi**.\n- **Rekomendasi Manual:** Harap periksa daftar 'Alert Aktif' untuk mengidentifikasi wilayah prioritas dan tindakan yang diperlukan.`;
    }
};


export const getSmartRecommendations = async (alert: ActiveAlertData): Promise<string> => {
  const prompt = `
    You are an expert in public health policy for early childhood development in Indonesia.
    Based on the following health alert, provide a strategic justification and then three specific, actionable, and efficient intervention recommendations.
    Format the response as a well-structured markdown with a title, a justification section, and a numbered list of recommendations.

    Alert Details:
    - Issue: ${alert.title}
    - Region: ${alert.region}
    - Domain: ${alert.domain}
    - Risk Score: ${alert.riskScore}
    ${alert.target ? `- Target: >${alert.target}%` : ''}
    ${alert.trend ? `- Trend: +${alert.trend}%` : ''}

    Provide recommendations that are contextual to Indonesia and consider resource constraints. The entire response must be in Bahasa Indonesia.
  `;

  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
    });
    return response.text;
  } catch (e) {
    console.error("Gemini API call failed in getSmartRecommendations", e);
    return `### Rekomendasi AI Tidak Tersedia\n\nTerjadi kesalahan saat menghubungi layanan AI. Harap coba lagi.`;
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
    Provide a concise analytical insight in Bahasa Indonesia, formatted as markdown.
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
    3.  Write a concise insight in Bahasa Indonesia, formatted as markdown.
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
      4. Prioritize interventions that are proven to be effective for stunting and child health.
      5. Use Google Search to find and cite the latest Indonesian government regulations (Peraturan Pemerintah), presidential decrees (Perpres), or ministerial regulations (Permenkes/Permendikbud) related to stunting prevention, PAUD-HI, and national health budgets. Base your recommendations on these official sources.
      6. Ensure the total proposed budget allocation does not exceed the available budget.
      7. The entire response must be in Bahasa Indonesia and formatted as professional markdown.
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
      Provide a concise analysis of this scenario in well-structured markdown.
      1. Start with a clear title summarizing the scenario.
      2. Write a "Ringkasan Eksekutif" (1-2 sentences) of the most likely outcome.
      3. Create a "Potensi Keuntungan" section listing 2-3 potential positive impacts.
      4. Create a "Potensi Risiko" section listing 2-3 potential negative impacts or trade-offs.
      5. Conclude with a "Rekomendasi Mitigasi" section, suggesting one key action to maximize benefits and minimize risks.
      6. Use Google Search to incorporate recent news, official government statements, or policy shifts in Indonesia that could affect this scenario's outcome. Cite your sources.
      7. The entire response must be in Bahasa Indonesia.
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
        Provide an executive summary and a justification in structured markdown and Bahasa Indonesia.
        1.  Create a title: "Ringkasan Kinerja Bulan ${monthName}".
        2.  Write an "Analisis Umum" section summarizing the national trend.
        3.  Highlight "Wilayah Berkinerja Terbaik" and explain why they are important to study.
        4.  Highlight "Wilayah Perlu Perhatian" and suggest initial actions.
        5.  Provide a concluding "Rekomendasi" on next steps.
        6.  Add a "Dasar Analisis" section explaining your logic, focusing on why top movers are critical signals.
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
        Provide an executive summary and justification in structured markdown and Bahasa Indonesia.
        1.  Create a title: "Analisis Perbandingan Antar Domain Tahun ${year}".
        2.  Identify and analyze the "Tantangan Utama" (the domain with the highest average risk).
        3.  Identify and analyze the "Bidang Paling Stabil" (the domain with the lowest average risk).
        4.  Discuss the "Kesenjangan Kinerja" by using the best/worst performer data as examples.
        5.  Provide a concluding "Rekomendasi Strategis".
        6.  Add a "Dasar Analisis" section explaining your comparative logic.
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