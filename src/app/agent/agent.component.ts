// Angular imports
import { Component } from '@angular/core'

// App imports
import { Association, Symbol } from '../../core/core.data'
import { Core } from '../../core/core'

@Component({
  selector: 'app-agent',
  templateUrl: './agent.component.html',
  styleUrls: ['./agent.component.css']
})
export class AgentComponent {
  input: string
  // Note - all memory is built on a shared substrate of symbols
  // The associations that make up memory should not be shared
  longTermMemory: Association[] = []
  perceptualMemory: Association[] = []
  workingMemory: Association[] = []

  processInput(): void {
    let inputSymbol: Symbol = { name: this.input }

    this.perceptualMemory = Core.push(inputSymbol, this.perceptualMemory, 1)

    let recognisedAssociation: Association = Core.recognize(this.perceptualMemory, this.longTermMemory)

    if (recognisedAssociation) { // Recognise perception and merge into working memory
      this.perceptualMemory = Core.push(recognisedAssociation.symbol, this.perceptualMemory, 1)
      this.workingMemory = Core.merge(this.perceptualMemory, this.workingMemory, 0.5)
    } else { // Contextualize new symbol, bring into working memory and store in long-term memory
      this.workingMemory = Core.push(Core.contextualize(inputSymbol, this.workingMemory), this.workingMemory, 3)
      this.longTermMemory = Core.merge(this.workingMemory, this.longTermMemory, 0.5)
    }
  }
}
