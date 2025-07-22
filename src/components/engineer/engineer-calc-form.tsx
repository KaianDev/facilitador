/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

// Components
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Button } from "../ui/button"
import { MoneyInput } from "../ui/money-input"

// Utilities
import { type EngineerCalcSchema, engineerCalcSchema } from "@/schemas/engineer"
import { validadeInputMoney } from "@/helpers/validate-input-money"
import type { EngineerResultCalc } from "@/types/engineer-result-calc"

interface EngineerCalcFormProps {
  results: EngineerResultCalc | null
  setResults: (results: EngineerResultCalc) => void
}

export const EngineerCalcForm = ({
  results,
  setResults,
}: EngineerCalcFormProps) => {
  const form = useForm<EngineerCalcSchema>({
    resolver: zodResolver(engineerCalcSchema),
  })

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (!results) {
      form.reset({
        budgetValue: "",
        proposalValue: "",
      })
    }
  }, [results])

  const handleSubmit = form.handleSubmit(({ budgetValue, proposalValue }) => {
    const numBudgetValue = Number.parseFloat(
      budgetValue.replaceAll(".", "").replace(",", ".")
    )
    const numProposalValue = Number.parseFloat(
      proposalValue.replaceAll(".", "").replace(",", ".")
    )

    const isBudgetValueValid = validadeInputMoney<EngineerCalcSchema>({
      form,
      value: numBudgetValue,
      name: "budgetValue",
    })
    const isProposalValueValid = validadeInputMoney<EngineerCalcSchema>({
      form,
      value: numProposalValue,
      name: "proposalValue",
    })

    if (numProposalValue > numBudgetValue) {
      form.setError("proposalValue", {
        type: "proposalValue",
        message:
          "O valor da proposta não pode ser maior que o valor do orçamento",
      })
      return
    }

    if (!isBudgetValueValid || !isProposalValueValid) {
      return
    }

    const isUnfeasible = numProposalValue < numBudgetValue * 0.75
    const needAdditionalGuarantee = numProposalValue < numBudgetValue * 0.85
    const additionalGuarantee = numBudgetValue * 0.85 - numProposalValue
    const fivePercentProposalValue = numProposalValue * 0.05
    const totalInsuranceValue = needAdditionalGuarantee
      ? additionalGuarantee + fivePercentProposalValue
      : fivePercentProposalValue

    setResults({
      budgetValue: numBudgetValue,
      proposalValue: numProposalValue,
      isUnfeasible,
      needAdditionalGuarantee,
      additionalGuarantee,
      fivePercentProposalValue,
      totalInsuranceValue,
    })
  })

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="space-y-6">
        <FormField
          name="budgetValue"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Valor do Orçamento</FormLabel>
              <FormControl>
                <MoneyInput
                  {...field}
                  autoComplete="off"
                  placeholder="Informe o valor do orçamento"
                />
              </FormControl>
              <FormDescription className="text-xs">
                Preencher o campo apenas com números.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="proposalValue"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Valor da Proposta</FormLabel>
              <FormControl>
                <MoneyInput
                  {...field}
                  autoComplete="off"
                  placeholder="Informe o valor da proposta"
                />
              </FormControl>
              <FormDescription className="text-xs">
                Preencher o campo apenas com números.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          Calcular
        </Button>
      </form>
    </Form>
  )
}
