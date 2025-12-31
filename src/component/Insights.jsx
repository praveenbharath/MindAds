import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
} from "./Table";
import Image from "next/image";
import Badge from "./Badge";
import { useCallback, useRef, useState } from "react";
import axios from "axios";
import Modal from "./Modal1";
import { BarChart3, Activity, Flag } from "lucide-react";
import { Spin, Tooltip } from "antd";

// Table data (no TypeScript interface)

export default function RecentOrders({ Result }) {

    const [campaignResult, setcampaignResult] = useState([])
    const [InsightResult, setInsightResult] = useState([])
    const [InsightStreamResult, setInsightStreamResult] = useState([])

    console.log("campaignResult", campaignResult);
    const [openModal, setOpenModal] = useState(false);
    const [loading, setloading] = useState(false);


    const [openinsightmodal, setopeninsightmodal] = useState(false);
    const [openinsightStream_modal, setopeninsightStream_modal] = useState(false);

    const ResultDummy = {
        "campaigns": [
            {
                "id": "camp_001",
                "name": "Summer Sale - Meta",
                "brand_id": "brand_001",
                "status": "active",
                "budget": 10000,
                "daily_budget": 500,
                "platforms": [
                    "meta"
                ],
                "created_at": "2025-11-01T10:00:00Z"
            },
            {
                "id": "camp_002",
                "name": "Black Friday - Google Search",
                "brand_id": "brand_001",
                "status": "active",
                "budget": 25000,
                "daily_budget": 1500,
                "platforms": [
                    "google"
                ],
                "created_at": "2025-10-15T09:00:00Z"
            },
            {
                "id": "camp_003",
                "name": "Q4 Retargeting - Meta",
                "brand_id": "brand_002",
                "status": "active",
                "budget": 15000,
                "daily_budget": 800,
                "platforms": [
                    "meta"
                ],
                "created_at": "2025-11-05T14:30:00Z"
            },
            {
                "id": "camp_004",
                "name": "Product Launch - LinkedIn",
                "brand_id": "brand_003",
                "status": "active",
                "budget": 12000,
                "daily_budget": 600,
                "platforms": [
                    "linkedin"
                ],
                "created_at": "2025-11-10T11:15:00Z"
            },
            {
                "id": "camp_005",
                "name": "Brand Awareness - Multi-platform",
                "brand_id": "brand_002",
                "status": "active",
                "budget": 20000,
                "daily_budget": 1000,
                "platforms": [
                    "meta",
                    "google",
                    "linkedin"
                ],
                "created_at": "2025-10-20T16:45:00Z"
            },
            {
                "id": "camp_006",
                "name": "Holiday Special - YouTube",
                "brand_id": "brand_004",
                "status": "active",
                "budget": 18000,
                "daily_budget": 900,
                "platforms": [
                    "google"
                ],
                "created_at": "2025-11-12T13:00:00Z"
            },
            {
                "id": "camp_007",
                "name": "App Install - Meta",
                "brand_id": "brand_005",
                "status": "active",
                "budget": 8000,
                "daily_budget": 400,
                "platforms": [
                    "meta"
                ],
                "created_at": "2025-11-15T10:30:00Z"
            },
            {
                "id": "camp_008",
                "name": "Winter Collection - Instagram",
                "brand_id": "brand_001",
                "status": "active",
                "budget": 5000,
                "daily_budget": 250,
                "platforms": [
                    "meta"
                ],
                "created_at": "2025-11-18T09:00:00Z"
            },
            {
                "id": "camp_009",
                "name": "B2B Lead Gen - LinkedIn",
                "brand_id": "brand_003",
                "status": "paused",
                "budget": 10000,
                "daily_budget": 500,
                "platforms": [
                    "linkedin"
                ],
                "created_at": "2025-09-01T15:10:00Z"
            },
            {
                "id": "camp_010",
                "name": "Competitor Conquesting - Google",
                "brand_id": "brand_004",
                "status": "paused",
                "budget": 7500,
                "daily_budget": 350,
                "platforms": [
                    "google"
                ],
                "created_at": "2025-09-15T08:00:00Z"
            },
            {
                "id": "camp_011",
                "name": "Webinar Promo - Multi-platform",
                "brand_id": "brand_003",
                "status": "paused",
                "budget": 6000,
                "daily_budget": 300,
                "platforms": [
                    "linkedin",
                    "meta"
                ],
                "created_at": "2025-10-01T11:00:00Z"
            },
            {
                "id": "camp_012",
                "name": "Early Bird Access - Email",
                "brand_id": "brand_005",
                "status": "paused",
                "budget": 2000,
                "daily_budget": 100,
                "platforms": [
                    "other"
                ],
                "created_at": "2025-10-10T14:00:00Z"
            },
            {
                "id": "camp_013",
                "name": "Back to School - Meta",
                "brand_id": "brand_001",
                "status": "completed",
                "budget": 15000,
                "daily_budget": 750,
                "platforms": [
                    "meta"
                ],
                "created_at": "2025-08-01T10:00:00Z"
            },
            {
                "id": "camp_014",
                "name": "Summer Clearance - Google",
                "brand_id": "brand_002",
                "status": "completed",
                "budget": 12000,
                "daily_budget": 600,
                "platforms": [
                    "google"
                ],
                "created_at": "2025-08-15T09:30:00Z"
            }
        ],
        "total": 14
    }
    const insightStreamRef = useRef(null);

    const campaigns = Result?.campaigns || ResultDummy.campaigns;
    const statusColorMap = {
        active: "success",
        paused: "warning",
        completed: "dark",
        cancelled: "error",
    };

    const getBadgeColor = (status) => {
        switch (status) {
            case "active":
                return "success";
            case "paused":
                return "warning";
            case "completed":
                return "dark";
            default:
                return "light";
        }
    };


    const function_id_ForCampaigns = useCallback(async (id) => {
        try {
            setloading(true)

            const result = await axios.get(`https://mixo-fe-backend-task.vercel.app/campaigns/${id}`)
            console.log("resultt", result)
            setcampaignResult(result?.data?.campaign)
            setOpenModal(true)
            setloading(false)

        } catch (err) {
            console.log(err)
            setloading(false)

        }

    }, [])


    const function_id_ForSights = useCallback(async (id) => {
        try {
            setloading(true)
            const result = await axios.get(`https://mixo-fe-backend-task.vercel.app/campaigns/${id}/insights`)
            console.log("resultt", result)
            setInsightResult(result?.data?.insights)
            setopeninsightmodal(true)
            setloading(false)

        } catch (err) {
            console.log(err)
            setloading(false)

        }

    }, [])

    const function_id_ForSights_Stream = useCallback((id) => {
        if (!id) return;

        // Close previous stream if exists
        if (insightStreamRef.current) {
            insightStreamRef.current.close();
        }

        setInsightStreamResult([]);
        setloading(true);

        const eventSource = new EventSource(
            `https://mixo-fe-backend-task.vercel.app/campaigns/${id}/insights/stream`
        );

        insightStreamRef.current = eventSource;

        eventSource.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);

                setInsightStreamResult((prev) => [...prev, data]);
                setopeninsightStream_modal(true);
                setloading(false);
            } catch (err) {
                console.error("Error parsing SSE data:", err);
                setloading(false);
            }
        };

        eventSource.onerror = (err) => {
            console.error("SSE connection error:", err);
            eventSource.close();
            insightStreamRef.current = null;
            setloading(false);
        };
    }, []);



    const handleclick_campign = (data) => {
        if (data?.id) {
            function_id_ForCampaigns(data?.id)

        }

    }
    const handleclick_insight = (data) => {
        if (data?.id) {

            function_id_ForSights(data?.id)
        }
    }

    const handleclick_insightStream = (data) => {
        if (data?.id) {

            function_id_ForSights_Stream(data?.id)
        }
    }

    console.log("dbsyuuy", InsightResult);
    const handleclose_insightsStream = () => {
        setopeninsightStream_modal(false);

        if (insightStreamRef.current) {
            insightStreamRef.current.close();
            insightStreamRef.current = null;
        }
    };

    return (
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
            <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
                    Dashboard
                </h3>

            </div>
            <div className="max-w-full overflow-x-auto relative">
                {loading && (
                    <div className="absolute inset-0 flex justify-center items-center bg-white/70 z-10">
                        <Spin size="large" />
                    </div>
                )}
                <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
                    <Table className="min-w-full">
                        {/* Table Header */}
                        <TableHeader className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                            <TableRow>
                                <TableCell isHeader className="py-3 px-4 text-start text-xs font-semibold text-gray-500 dark:text-gray-400">
                                    Name
                                </TableCell>
                                <TableCell isHeader className="py-3 px-4 text-start text-xs font-semibold text-gray-500 dark:text-gray-400">
                                    Brand Id
                                </TableCell>
                                <TableCell isHeader className="py-3 px-4 text-start text-xs font-semibold text-gray-500 dark:text-gray-400">
                                    Budget
                                </TableCell>
                                <TableCell isHeader className="py-3 px-4 text-start text-xs font-semibold text-gray-500 dark:text-gray-400">
                                    Status
                                </TableCell>
                                <TableCell isHeader className="py-3 px-4 text-start text-xs font-semibold text-gray-500 dark:text-gray-400">
                                    Platform
                                </TableCell>
                                <TableCell isHeader className="py-3 px-4 text-start text-xs font-semibold text-gray-500 dark:text-gray-400">
                                    Actions
                                </TableCell>
                            </TableRow>
                        </TableHeader>

                        <TableBody className="divide-y divide-gray-100 dark:divide-gray-700">
                            {campaigns.map((campaign) => {
                                let statusBg = "";
                                let statusTextColor = "text-white";

                                switch (campaign.status) {
                                    case "active":
                                        statusBg = "bg-green-100 dark:bg-green-600";
                                        statusTextColor = "text-black dark:text-black";

                                        break;
                                    case "paused":
                                        statusBg = "bg-yellow-100 dark:bg-yellow-500";
                                        statusTextColor = "text-black dark:text-white";
                                        break;
                                    case "completed":
                                        statusBg = "bg-gray-200 dark:bg-gray-700";
                                        statusTextColor = "text-black dark:text-white";
                                        break;
                                    default:
                                        statusBg = "bg-gray-100 dark:bg-gray-800";
                                }

                                return (
                                    <TableRow
                                        key={campaign.id}
                                        className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer"
                                    >
                                        {/* Name */}
                                        <TableCell className="py-3 px-4 font-medium text-gray-800 dark:text-white/90">
                                            {campaign.name}
                                        </TableCell>

                                        {/* Brand */}
                                        <TableCell className="py-3 px-4 text-gray-500 dark:text-gray-400">
                                            {campaign.brand_id}
                                        </TableCell>

                                        {/* Budget */}
                                        <TableCell className="py-3 px-4 text-gray-500 dark:text-gray-400">
                                            ₹{campaign.budget.toLocaleString() || 0}
                                        </TableCell>

                                        {/* Status */}
                                        <TableCell className="py-1 px-3 rounded-lg text-center w-28">
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusBg} ${statusTextColor}`}>
                                                {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                                            </span>
                                        </TableCell>

                                        {/* Platforms */}
                                        <TableCell className="py-3 px-4 text-gray-500 dark:text-gray-400">
                                            {campaign.platforms.join(", ")}
                                        </TableCell>

                                        {/* Actions */}
                                        <TableCell className="py-3 px-4 flex gap-3 text-gray-500 dark:text-gray-400">
                                            <Tooltip title="View Campaign">
                                                <Flag
                                                    size={20}
                                                    onClick={(e) => handleclick_campign(campaign)}
                                                    title="View Campaign"
                                                />

                                            </Tooltip>
                                            <Tooltip title="View Insights">

                                                <BarChart3
                                                    size={20}
                                                    onClick={(e) => handleclick_insight(campaign)}
                                                    title="View Insights"
                                                />
                                            </Tooltip>

                                            <Tooltip title="View Live Insights">

                                                <Activity
                                                    size={20}
                                                    onClick={(e) => handleclick_insightStream(campaign)}
                                                    title="View Live Insights"
                                                />
                                            </Tooltip>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </div>
            </div>

            <Modal open={openModal} onClose={() => setOpenModal(false)}>
                <h2 className="mb-4 text-xl font-semibold">Campaign Details</h2>

                {campaignResult && (
                    <div className="space-y-2 text-sm">
                        <p><b>ID:</b> {campaignResult.id}</p>
                        <p><b>Name:</b> {campaignResult.name}</p>
                        <p><b>Brand:</b> {campaignResult.brand_id}</p>
                        <p><b>Status:</b> {campaignResult.status}</p>
                        <p><b>Budget:</b> ₹{campaignResult.budget}</p>
                        <p><b>Daily Budget:</b> ₹{campaignResult.daily_budget}</p>
                        <p><b>Platforms:</b> {campaignResult.platforms && campaignResult.platforms.join(", ")}</p>
                        <p><b>Created At:</b> {new Date(campaignResult.created_at).toLocaleString() || ""}</p>
                    </div>
                )}
            </Modal>
            <Modal open={openinsightmodal} onClose={() => setopeninsightmodal(false)}>
                <h2 className="mb-4 text-xl font-semibold">Campaign Insights</h2>

                {InsightResult && (
                    <div className="space-y-2 text-sm">
                        <p><b>Campaign ID:</b> {InsightResult.campaign_id}</p>
                        <p><b>Timestamp:</b> {new Date(InsightResult.timestamp).toLocaleString() || ""}</p>
                        <p><b>Impressions:</b> {InsightResult.impressions?.toLocaleString() || ""}</p>
                        <p><b>Clicks:</b> {InsightResult.clicks?.toLocaleString() || ""}</p>
                        <p><b>Conversions:</b> {InsightResult.conversions?.toLocaleString() || ""}</p>
                        <p><b>Spend:</b> ₹{InsightResult.spend?.toLocaleString() || ""}</p>
                        <p><b>CTR:</b> {InsightResult.ctr}%</p>
                        <p><b>CPC:</b> ₹{InsightResult.cpc}</p>
                        <p><b>Conversion Rate:</b> {InsightResult.conversion_rate}%</p>
                    </div>
                )}
            </Modal>

            <Modal open={openinsightStream_modal}
                onClose={(e) => handleclose_insightsStream(e)}
            >
                <h2 className="mb-4 text-xl font-semibold">Campaign Insights Stream</h2>

                {Array.isArray(InsightStreamResult) && InsightStreamResult.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <thead className="bg-gray-50 dark:bg-gray-800">
                                <tr>
                                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Timestamp</th>
                                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Impressions</th>
                                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Clicks</th>
                                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Conversions</th>
                                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Spend</th>
                                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 dark:text-gray-400">CTR (%)</th>
                                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 dark:text-gray-400">CPC</th>
                                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Conversion Rate (%)</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                                {InsightStreamResult.map((item, index) => (
                                    <tr key={index}>
                                        <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">{new Date(item.timestamp).toLocaleString()}</td>
                                        <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">{item.impressions.toLocaleString()}</td>
                                        <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">{item.clicks.toLocaleString()}</td>
                                        <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">{item.conversions.toLocaleString()}</td>
                                        <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">₹{item.spend.toLocaleString()}</td>
                                        <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">{item.ctr}</td>
                                        <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">₹{item.cpc}</td>
                                        <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">{item.conversion_rate}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p className="text-gray-500">No insight data available.</p>
                )}
            </Modal>
            {console.log("InsightStreamResult", InsightStreamResult)}


        </div>
    );
}
