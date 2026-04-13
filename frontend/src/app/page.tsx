"use client";

import { Button, Typography } from "antd";
import { SmileOutlined } from "@ant-design/icons";

const { Title, Paragraph } = Typography;

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-24 bg-gray-50 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm text-center max-w-lg border border-gray-100 dark:border-gray-700">
        <SmileOutlined className="text-5xl text-blue-500 mb-4" />
        <Title level={2} style={{ margin: 0, marginBottom: '8px' }}>Next.js Base Setup</Title>
        <Paragraph className="text-gray-500 font-sans mb-8">
          Frontend base successfully generated! Contains Ant Design, Tailwind CSS v4, Zustand, React Query, Zod and React-Hook-Form.
        </Paragraph>
        <div className="flex gap-4 justify-center">
          <Button type="primary" size="large">
            Get Started
          </Button>
          <Button size="large">
            Explore Features
          </Button>
        </div>
      </div>
    </main>
  );
}
