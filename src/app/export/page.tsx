import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import ExportSection from './components/export-section'

export default function Export() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Export</CardTitle>
        <CardDescription>
          Congratulations! You have successfully generated a Df-Analyzer script!
          You can copy or download the python code below.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ExportSection />
      </CardContent>
    </Card>
  )
}
