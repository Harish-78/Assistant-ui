import { ChevronDown, Cpu } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import type { AIModel } from "../types/assistant.types"
import { AVAILABLE_MODELS } from "../mock/initial-data"

export function ModelSelector({
  selectedModel,
  onSelectModel,
}: {
  selectedModel: AIModel
  onSelectModel: (model: AIModel) => void
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-1.5 shadow-2xs hover:bg-accent outline-none transition-colors">
        <Cpu className="size-4 text-foreground" />
        <span className="text-sm font-bold">{selectedModel.name}</span>
        <Badge variant="outline" className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0 border-border text-foreground">
          {selectedModel.badge}
        </Badge>
        <ChevronDown className="size-3 text-muted-foreground ml-1" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-56 border-border">
        {AVAILABLE_MODELS.map((model) => {
          const Icon = model.icon
          return (
            <DropdownMenuItem
              key={model.id}
              onClick={() => onSelectModel(model)}
              className="flex items-center justify-between cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <Icon className="size-4 text-foreground" />
                <span className="font-medium">{model.name}</span>
              </div>
              <Badge variant="outline" className="text-[9px] border-border">
                {model.badge}
              </Badge>
            </DropdownMenuItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
