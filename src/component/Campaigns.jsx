import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
} from "./Table";
import Badge from "./Badge";

// COMPONENT
export default function Campaigns({ resultForInsights }) {

    // ✅ FALLBACK DUMMY DATA
    const resultForInsightsDummy = {
        insights: {
            timestamp: "2025-12-30T15:57:55.226Z",
            total_campaigns: 14,
            active_campaigns: 8,
            paused_campaigns: 4,
            completed_campaigns: 2,
            total_impressions: 402605,
            total_clicks: 18283,
            total_conversions: 835,
            total_spend: 46100,
            avg_ctr: 4.54,
            avg_cpc: 2.52,
            avg_conversion_rate: 4.57,
        },
    };

    // ✅ SAFE DATA EXTRACTION
    const insights =
        resultForInsights?.insights || resultForInsightsDummy.insights;

    return (
        <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">

            {/* HEADER */}
            <h3 className="mb-6 text-lg font-semibold text-gray-800 dark:text-white/90">
                counts
            </h3>

            {/* INSIGHTS GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {/* Total Campaigns */}
                <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-900 shadow hover:shadow-lg transition-shadow">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-300">Total Campaigns</p>
                    <p className="mt-1 text-xl font-semibold text-gray-800 dark:text-white">
                        {insights.total_campaigns}
                    </p>
                </div>

                {/* Active */}
                <div className="p-4 rounded-xl bg-green-50 dark:bg-green-900 shadow hover:shadow-lg transition-shadow">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-300">Active</p>
                    <p className="mt-1 text-xl font-semibold text-gray-800 dark:text-white">
                        {insights.active_campaigns}
                    </p>
                </div>

                {/* Paused */}
                <div className="p-4 rounded-xl bg-yellow-50 dark:bg-yellow-900 shadow hover:shadow-lg transition-shadow">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-300">Paused</p>
                    <p className="mt-1 text-xl font-semibold text-gray-800 dark:text-white">
                        {insights.paused_campaigns}
                    </p>
                </div>

                {/* Completed */}
                <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800 shadow hover:shadow-lg transition-shadow">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-300">Completed</p>
                    <p className="mt-1 text-xl font-semibold text-gray-800 dark:text-white">
                        {insights.completed_campaigns}
                    </p>
                </div>

                {/* Impressions */}
                <div className="p-4 rounded-xl bg-teal-50 dark:bg-teal-900 shadow hover:shadow-lg transition-shadow">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-300">Impressions</p>
                    <p className="mt-1 text-xl font-semibold text-gray-800 dark:text-white">
                        {insights.total_impressions.toLocaleString("en-IN")}
                    </p>
                </div>

                {/* Clicks */}
                <div className="p-4 rounded-xl bg-indigo-50 dark:bg-indigo-900 shadow hover:shadow-lg transition-shadow">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-300">Clicks</p>
                    <p className="mt-1 text-xl font-semibold text-gray-800 dark:text-white">
                        {insights.total_clicks.toLocaleString("en-IN")}
                    </p>
                </div>

                {/* Conversions */}
                <div className="p-4 rounded-xl bg-green-50 dark:bg-green-800 shadow hover:shadow-lg transition-shadow">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-300">Conversions</p>
                    <p className="mt-1 text-xl font-semibold text-gray-800 dark:text-white">
                        {insights.total_conversions}
                    </p>
                </div>

                {/* Spend */}
                <div className="p-4 rounded-xl bg-red-50 dark:bg-red-900 shadow hover:shadow-lg transition-shadow">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-300">Spend</p>
                    <p className="mt-1 text-xl font-semibold text-gray-800 dark:text-white">
                        ₹{insights.total_spend.toLocaleString("en-IN")}
                    </p>
                </div>

                {/* Avg CTR */}
                <div className="p-4 rounded-xl bg-teal-50 dark:bg-teal-900 shadow hover:shadow-lg transition-shadow">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-300">Avg CTR</p>
                    <p className="mt-1 text-xl font-semibold text-gray-800 dark:text-white">
                        {insights.avg_ctr}%
                    </p>
                </div>

                {/* Avg CPC */}
                <div className="p-4 rounded-xl bg-yellow-50 dark:bg-yellow-900 shadow hover:shadow-lg transition-shadow">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-300">Avg CPC</p>
                    <p className="mt-1 text-xl font-semibold text-gray-800 dark:text-white">
                        ₹{insights.avg_cpc}
                    </p>
                </div>

                {/* Avg Conversion Rate */}
                <div className="p-4 rounded-xl bg-green-50 dark:bg-green-900 shadow hover:shadow-lg transition-shadow">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-300">Avg Conversion Rate</p>
                    <p className="mt-1 text-xl font-semibold text-gray-800 dark:text-white">
                        {insights.avg_conversion_rate}%
                    </p>
                </div>
            </div>
        </div>
    );
}


