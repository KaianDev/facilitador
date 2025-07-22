import type { EngineerResultCalc } from "@/types/engineer-result-calc"
import { CheckCircle2Icon, AlertCircleIcon } from "lucide-react"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

// Utilities
import { formatMoney } from "@/helpers/format-money"

interface EngineerCalcResultsProps {
  results: EngineerResultCalc
  clearResults: () => void
}

export const EngineerCalcResults = ({
  results,
  clearResults,
}: EngineerCalcResultsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Resultado</CardTitle>
        <CardDescription className="text-xs">
          Passe o mouse sobre os campos e veja uma breve explicação.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="text-sm">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <li className="border-b border-border py-2 flex justify-between items-center">
                  <strong>Orçamento:</strong>
                  <span>{formatMoney(results.budgetValue)}</span>
                </li>
              </TooltipTrigger>
              <TooltipContent>
                Valor total do orçamento, valor estimado.
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <li className="flex justify-between items-center border-b border-border py-2">
                  <strong>Valor da Proposta:</strong>
                  <span>{formatMoney(results.proposalValue)}</span>
                </li>
              </TooltipTrigger>
              <TooltipContent>
                Valor total da proposta da empresa em análise.
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <li className="flex justify-between items-center border-b border-border py-2">
                  <strong>Valor é inexequível?</strong>
                  {results.isUnfeasible ? (
                    <Badge className="flex gap-1 items-center bg-red-400 hover:bg-red-500">
                      <AlertCircleIcon size={16} />
                      Sim
                    </Badge>
                  ) : (
                    <Badge className="flex gap-1 items-center  bg-emerald-700 hover:bg-emerald-800">
                      <CheckCircle2Icon size={16} />
                      Não
                    </Badge>
                  )}
                </li>
              </TooltipTrigger>
              <TooltipContent>
                {results.isUnfeasible ? (
                  <div>
                    Valor da proposta é inferior a 75% do valor do orçamento.
                    <br />
                    <em>
                      <span className="font-semibold">Obs*:</span> Solicitar
                      comprovação de exequibilidade
                    </em>
                  </div>
                ) : (
                  <span>
                    Valor da proposta é superior a <br />
                    75% do valor do orçamento.
                  </span>
                )}
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <li className="flex justify-between items-center border-b border-border py-2">
                  <strong>Precisa de garantia adicional?</strong>

                  {results.needAdditionalGuarantee ? (
                    <Badge className="flex gap-1 items-center bg-red-400 hover:bg-red-500">
                      <AlertCircleIcon size={16} />
                      Sim
                    </Badge>
                  ) : (
                    <Badge className="flex gap-1 items-center  bg-emerald-700 hover:bg-emerald-800">
                      <CheckCircle2Icon size={16} />
                      Não
                    </Badge>
                  )}
                </li>
              </TooltipTrigger>
              <TooltipContent>
                {results.needAdditionalGuarantee ? (
                  <span>
                    Valor da proposta é inferior a 85% do valor do orçamento.
                  </span>
                ) : (
                  <span>
                    Valor da proposta é superior a 85% do valor do orçamento.
                  </span>
                )}
              </TooltipContent>
            </Tooltip>
            {results.needAdditionalGuarantee && (
              <>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <li className="flex justify-between items-center border-b border-border py-2">
                      <strong>Garantia adicional</strong>
                      <span>{formatMoney(results.additionalGuarantee)}</span>
                    </li>
                  </TooltipTrigger>
                  <TooltipContent>
                    85% do valor do orçamento - valor da proposta.
                  </TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <li className="flex justify-between items-center border-b border-border py-2">
                      <strong>5% do valor da proposta</strong>
                      <span>
                        {formatMoney(results.fivePercentProposalValue)}
                      </span>
                    </li>
                  </TooltipTrigger>
                  <TooltipContent>
                    <span>5% do valor da proposta</span>
                  </TooltipContent>
                </Tooltip>
              </>
            )}

            <Tooltip>
              <TooltipTrigger asChild>
                <li className="flex justify-between items-center border-b border-border py-2">
                  <strong>Total da Garantia</strong>
                  <span>{formatMoney(results.totalInsuranceValue)}</span>
                </li>
              </TooltipTrigger>
              <TooltipContent>
                {results.needAdditionalGuarantee && (
                  <span>5% do valor da proposta + garantia adicional.</span>
                )}
                {!results.needAdditionalGuarantee && (
                  <span>5% do valor da proposta.</span>
                )}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </ul>
      </CardContent>
      <CardFooter>
        <Button onClick={clearResults} variant={"secondary"} className="w-full">
          Limpar
        </Button>
      </CardFooter>
    </Card>
  )
}
